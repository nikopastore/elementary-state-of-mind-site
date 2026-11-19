"""Private, read-only stdio MCP server for Elementary State of Mind."""
from datetime import date, timedelta
from mcp.server.fastmcp import FastMCP
from credential_store import load
from search_data import ORIGIN, ai_referrals, inspect, performance, properties
from site_audit import crawl

server = FastMCP("ESOM Search Console")


def window(days: int, end_date: str | None):
    if not 1 <= days <= 180:
        raise ValueError("Choose 1 to 180 days.")
    end = date.fromisoformat(end_date) if end_date else date.today() - timedelta(days=3)
    if end > date.today() - timedelta(days=3):
        raise ValueError("Choose a settled period ending at least three days ago.")
    return end - timedelta(days=days - 1), end


def account():
    credentials = load()
    owned = properties(credentials)
    if not owned:
        raise ValueError("No verified ESOM property found for this Google account.")
    return credentials, owned[0]


@server.tool()
def search_performance(days: int = 28, end_date: str | None = None, limit: int = 50) -> dict:
    """Read ESOM clicks, impressions, totals, prior period, top pages and queries, and opportunities."""
    if not 1 <= limit <= 500:
        raise ValueError("Choose a limit between 1 and 500.")
    start, end = window(days, end_date)
    credentials, prop = account()
    report = performance(credentials, prop, start, end)
    pairs = report.pop("pairs")
    opportunities = sorted((r for r in pairs if 4 <= r["Position"] <= 20),
                           key=lambda r: (-r["Impressions"], r["CTR %"]))
    return {"property": prop, "start": str(start), "end": str(end),
            **{k: rows[:limit] if k in ("query", "page") else rows for k, rows in report.items()},
            "opportunities": opportunities[:limit]}


@server.tool()
def inspect_indexed_url(url: str = ORIGIN + "/shop") -> dict:
    """Read Google's last known index status and canonical for a specific ESOM URL."""
    credentials, prop = account()
    return inspect(credentials, prop, url)


@server.tool()
def audit_public_site() -> list[dict]:
    """Crawl the public sitemap and report metadata, indexability, link and crawler findings."""
    return crawl()


@server.tool()
def assistant_referrals(ga4_property_id: str, days: int = 28, end_date: str | None = None) -> dict:
    """Read recognized assistant-referred GA4 visits and landing pages for the supplied property."""
    start, end = window(days, end_date)
    return {"start": str(start), "end": str(end),
            "rows": ai_referrals(load(), ga4_property_id, start, end)}


if __name__ == "__main__":
    server.run(transport="stdio")
