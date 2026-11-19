import json
import zipfile
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import quote

import pandas as pd
import requests
import streamlit as st
from google.auth.exceptions import GoogleAuthError
from oauthlib.oauth2 import OAuth2Error
from search_data import API, ORIGIN, ai_referrals, api, authorize, imported_report, inspect, performance, properties
from site_audit import crawl
from credential_store import load, save, forget
from keyring.errors import KeyringError

st.set_page_config(page_title="ESOM Search Console", layout="wide")
st.title("Elementary State of Mind")
st.caption("Search Console · Private workspace")
search_tab, audit_tab, ai_tab = st.tabs(["Search performance", "Site health", "AI referrals"])
state = st.session_state
errors = (KeyringError, ValueError, KeyError, TypeError, OSError, GoogleAuthError, OAuth2Error, requests.RequestException, zipfile.BadZipFile)


def show_import(name, data):
    report = imported_report(name, data)
    dates = sorted(r["date"] for r in report.get("date", []))
    period = f"{dates[0]} to {dates[-1]}" if dates else "Date range not included in this CSV"
    state.update(report=report, source=f"Imported {name} · {period}")


local_export = Path(__file__).with_name("local-import.zip")
if "report" not in state and not state.get("skip_local_export") and local_export.is_file():
    try:
        show_import(local_export.name, local_export.read_bytes())
    except errors as exc:
        st.warning(f"Could not open the local export: {exc}")

with st.sidebar:
    st.header("Data connection")
    if "creds" not in state:
        if st.button("Use saved Google connection"):
            try:
                credentials = load()
                accessible = properties(credentials)
                if not accessible:
                    raise ValueError("The saved account has no verified ESOM property.")
                state.update(creds=credentials, properties=accessible,
                             analytics=credentials.has_scopes(["https://www.googleapis.com/auth/analytics.readonly"]))
                st.rerun()
            except errors as exc:
                st.error(str(exc))
        client = st.file_uploader("Google Desktop OAuth client JSON", type="json")
        analytics = st.checkbox("Also request read-only Google Analytics access")
        if st.button("Connect Google", disabled=client is None):
            try:
                credentials = authorize(client.getvalue(), analytics)
                accessible = properties(credentials)
                if not accessible:
                    raise ValueError("This account has no verified ESOM property. Sign in with an owner or delegated user.")
                state.update(creds=credentials, properties=accessible, analytics=analytics)
                st.rerun()
            except errors as exc:
                st.error(str(exc))
        st.caption("Use the Google account that can see the ESOM Search Console property. You can also import an export below.")
    else:
        prop = st.selectbox("ESOM property", state.properties)
        if st.button("Enable local assistant access"):
            try:
                save(state.creds)
                st.success("Read-only grant saved to the operating system credential vault.")
            except errors as exc:
                st.error(str(exc))
        if st.button("Disconnect and clear reports"):
            state.clear()
            state.skip_local_export = True
            st.rerun()
    with st.expander("Saved assistant access"):
        if st.button("Remove saved assistant access"):
            try:
                forget()
                st.success("Saved grant removed from this computer.")
            except errors as exc:
                st.error(str(exc))
    last_day = date.today() - timedelta(days=3)
    days = st.selectbox("Reporting window (days)", [28, 7, 90])
    end = st.date_input("Period ending", value=last_day, max_value=last_day)
    start = end - timedelta(days=days - 1)

with search_tab:
    st.header("Google Search performance")
    if "creds" in state:
        if st.button("Load Search Console data", type="primary"):
            try:
                report = performance(state.creds, prop, start, end)
                state.report = report
                state.source = f"{prop} · {start} to {end} · compared with the previous {days} days"
            except errors as exc:
                st.error(str(exc))
    with st.expander("Import a Google Search Console export", expanded="creds" not in state):
        st.write("In Google Search Console, open Performance → Search results, select Web and choose Export → Download CSV. Use the ZIP or an individual Queries, Pages or Dates CSV.")
        upload = st.file_uploader("Performance ZIP or CSV", type=["zip", "csv"])
        if st.button("Analyze export", disabled=upload is None):
            try:
                show_import(upload.name, upload.getvalue())
            except errors as exc:
                st.error(str(exc))
    if "report" in state:
        st.subheader("Results")
        st.caption(state.source)
        report = state.report
        if report.get("summary"):
            total = report["summary"][0]
            prior = (report.get("previous") or [{}])[0]
            for col, (label, value) in zip(st.columns(4), total.items()):
                precision = 0 if label in ("Clicks", "Impressions") else 2
                delta = round(value - prior[label], precision) if value is not None and prior.get(label) is not None else None
                col.metric(label, f"{value:,.{precision}f}" if value is not None else "—", delta=delta,
                           delta_color="inverse" if label == "Position" else "normal")
        if report.get("date"):
            daily = pd.DataFrame(report["date"]).sort_values("date").set_index("date")
            st.line_chart(daily[["Clicks", "Impressions"]], y_label="Google Search activity")
        for dimension, label in [("query", "Queries"), ("page", "Landing pages")]:
            if dimension in report:
                st.subheader(label)
                if report[dimension]:
                    st.dataframe(report[dimension], hide_index=True)
                else:
                    st.caption("Google returned no visible rows for this breakdown.")
        sample = report.get("pairs", report.get("query", []))
        opportunities = sorted((r for r in sample if r["Position"] is not None and 4 <= r["Position"] <= 20),
                               key=lambda r: (-r["Impressions"], r["CTR %"]))
        st.subheader("Queries within reach")
        st.caption("Average position 4–20, ordered by impressions. API reports include matching pages and up to 25,000 top rows per dimension. Google can withhold rare queries.")
        if opportunities:
            st.dataframe(opportunities[:100], hide_index=True)
        else:
            st.info("No matching rows in this report.")
        st.download_button("Download analyzed report", json.dumps(report, indent=2), "esom-search-report.json")
    else:
        st.info("Connect Google or import a Performance export to see real impressions, clicks and opportunities.")

with audit_tab:
    st.header("Live site health")
    st.write("Check every sitemap page for crawl access, index directives, canonical URLs, titles, HTML links and structured data.")
    if st.button("Crawl the public site"):
        try:
            with st.spinner("Checking sitemap pages…"):
                state.audit = crawl()
        except errors as exc:
            st.error(str(exc))
    if "audit" in state:
        issues = sum(bool(r["Issues"]) for r in state.audit)
        st.write(f"{len(state.audit)} pages checked · {issues} pages with findings")
        st.dataframe(state.audit, hide_index=True)
    if "creds" in state:
        st.subheader("Google index status")
        url = st.text_input("ESOM page URL", value=ORIGIN + "/shop")
        if st.button("Inspect indexed URL"):
            try:
                st.json(inspect(state.creds, prop, url))
            except errors as exc:
                st.error(str(exc))
        if st.button("Read submitted sitemaps"):
            try:
                result = api(state.creds, "GET", API + "/" + quote(prop, safe="") + "/sitemaps")
                st.dataframe(result.get("sitemap", []), hide_index=True)
            except errors as exc:
                st.error(str(exc))

with ai_tab:
    st.header("Referrals from AI assistants")
    st.write("Read GA4 sessions with a recognized assistant source and see where visitors landed. An answer can cite a page without producing a visit. Google AI search visits can appear as organic search.")
    if "creds" in state and state.get("analytics"):
        ga_id = st.text_input("ESOM GA4 property ID")
        if st.button("Read assistant referrals", disabled=not ga_id):
            try:
                rows = ai_referrals(state.creds, ga_id, start, end)
                st.caption(f"GA4 property {ga_id} · {start} to {end}")
                if rows:
                    st.dataframe(rows, hide_index=True)
                else:
                    st.info("GA4 returned no sessions from the tracked assistant sources in this period.")
            except errors as exc:
                st.error(str(exc))
    else:
        st.info("Enable read-only Analytics access when connecting Google to measure referrals. Site health can check crawler access without an account.")
