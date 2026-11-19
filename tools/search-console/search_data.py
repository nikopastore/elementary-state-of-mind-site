"""ESOM's read-only Google reporting and English Search Console export reader."""
import csv
import io
import json
import zipfile
from datetime import timedelta
from pathlib import PurePosixPath
from urllib.parse import quote, urlparse

from google.auth.transport.requests import AuthorizedSession
from google_auth_oauthlib.flow import InstalledAppFlow

DOMAIN = "elementarystateofmind.com"
ORIGIN = "https://www." + DOMAIN
API = "https://www.googleapis.com/webmasters/v3/sites"
SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"
GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"
PROPERTIES = ["sc-domain:" + DOMAIN, ORIGIN + "/", "https://" + DOMAIN + "/"]


def authorize(upload, analytics):
    client = json.loads(upload)["installed"]
    config = {"installed": {
        "client_id": client["client_id"], "client_secret": client["client_secret"],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": ["http://localhost"],
    }}
    scopes = [SCOPE, GA_SCOPE] if analytics else [SCOPE]
    flow = InstalledAppFlow.from_client_config(config, scopes, autogenerate_code_verifier=True)
    return flow.run_local_server(host="127.0.0.1", port=0, timeout_seconds=150,
                                 authorization_prompt_message="", open_browser=True, prompt="consent")


def api(credentials, method, url, **kwargs):
    with AuthorizedSession(credentials) as session:
        result = session.request(method, url, timeout=30, **kwargs)
        if not result.ok:
            try:
                message = result.json()["error"]["message"]
            except (ValueError, KeyError, TypeError):
                message = result.reason
            raise ValueError(f"Google returned {result.status_code}: {message}")
        return result.json()


def properties(creds):
    rows = api(creds, "GET", API).get("siteEntry", [])
    permitted = {r["siteUrl"] for r in rows if r.get("permissionLevel") != "siteUnverifiedUser"}
    return [p for p in PROPERTIES if p in permitted]


def query(creds, prop, start, end, dims=()):
    url = API + "/" + quote(prop, safe="") + "/searchAnalytics/query"
    body = {"startDate": str(start), "endDate": str(end), "dimensions": list(dims),
            "dataState": "final", "type": "web", "rowLimit": 25000}
    raw = api(creds, "POST", url, json=body).get("rows", [])
    return [{**dict(zip(dims, row.get("keys", []))), "Clicks": row["clicks"],
             "Impressions": row["impressions"], "CTR %": round(row["ctr"] * 100, 2),
             "Position": round(row["position"], 2)} for row in raw]


def performance(creds, prop, start, end):
    span = end - start + timedelta(days=1)
    return {"summary": query(creds, prop, start, end),
            "previous": query(creds, prop, start - span, end - span),
            "date": query(creds, prop, start, end, ["date"]),
            "query": query(creds, prop, start, end, ["query"]),
            "page": query(creds, prop, start, end, ["page"]),
            "pairs": query(creds, prop, start, end, ["query", "page"])}


def inspect(creds, prop, url):
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.netloc not in {DOMAIN, "www." + DOMAIN}:
        raise ValueError("Enter an HTTPS URL on the ESOM domain.")
    response = api(creds, "POST", "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
                   json={"inspectionUrl": url, "siteUrl": prop})
    return response["inspectionResult"].get("indexStatusResult", {})


def ai_referrals(creds, property_id, start, end):
    if not property_id.isdecimal():
        raise ValueError("Enter the numeric GA4 property ID.")
    hosts = ["chatgpt.com", "chat.openai.com", "perplexity.ai", "www.perplexity.ai",
             "gemini.google.com", "claude.ai", "copilot.microsoft.com"]
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runReport"
    body = {"dateRanges": [{"startDate": str(start), "endDate": str(end)}],
            "dimensions": [{"name": "sessionSource"}, {"name": "landingPage"}],
            "metrics": [{"name": "sessions"}], "limit": 10000,
            "dimensionFilter": {"filter": {"fieldName": "sessionSource",
                "inListFilter": {"values": hosts, "caseSensitive": False}}}}
    rows = api(creds, "POST", url, json=body).get("rows", [])
    return [{"Source": r["dimensionValues"][0]["value"], "Landing page": r["dimensionValues"][1]["value"],
             "Sessions": int(r["metricValues"][0]["value"])} for r in rows]


def imported_report(name, data):
    tables = {}
    if len(data) > 25_000_000:
        raise ValueError("Use an export smaller than 25 MB.")
    if name.lower().endswith(".zip"):
        with zipfile.ZipFile(io.BytesIO(data)) as archive:
            files = [m for m in archive.infolist() if m.filename.lower().endswith(".csv")
                     and not PurePosixPath(m.filename).name.startswith(".")]
            if sum(m.file_size for m in files) > 50_000_000 or len(files) > 100:
                raise ValueError("Export is too large.")
            payloads = [archive.read(m) for m in files]
    else:
        payloads = [data]
    for payload in payloads:
        reader = csv.DictReader(io.StringIO(payload.decode("utf-8-sig")))
        names = reader.fieldnames or []
        dimension = {"Top queries": "query", "Top pages": "page", "Date": "date"}.get(next(iter(names), ""))
        if not dimension or not {"Clicks", "Impressions", "CTR", "Position"}.issubset(names):
            continue
        def number(value):
            value = (value or "").replace(",", "").replace("%", "").strip()
            return float(value) if value else None
        tables[dimension] = [{dimension: row[names[0]], "Clicks": int(number(row["Clicks"])),
            "Impressions": int(number(row["Impressions"])), "CTR %": number(row["CTR"]),
            "Position": number(row["Position"])} for row in reader]
    if not tables:
        raise ValueError("Choose a standard English Web Performance export with Queries, Pages or Dates. Turn off comparison before exporting.")
    dates = tables.get("date", [])
    if dates:
        clicks = sum(r["Clicks"] for r in dates)
        impressions = sum(r["Impressions"] for r in dates)
        ranked = [r for r in dates if r["Position"] is not None and r["Impressions"]]
        ranked_impressions = sum(r["Impressions"] for r in ranked)
        tables["summary"] = [{"Clicks": clicks, "Impressions": impressions,
            "CTR %": 100 * clicks / impressions if impressions else None,
            "Position": (sum(r["Position"] * r["Impressions"] for r in ranked) / ranked_impressions
                         if ranked_impressions else None)}]
    return tables
