"""Check the public site's sitemap URLs against their actual server-rendered HTML."""
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
import json
from urllib.parse import urljoin, urlsplit
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree

import requests
from search_data import ORIGIN


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = self.canonical = self.description = self.robots = ""
        self.h1 = 0
        self.tag = ""
        self.ld = None
        self.schemas = []
        self.links = set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tag = tag
        if tag == "h1":
            self.h1 += 1
        if tag == "meta" and a.get("name") == "description":
            self.description = a.get("content", "")
        if tag == "meta" and a.get("name") in {"robots", "googlebot"}:
            self.robots += " " + a.get("content", "").lower()
        if tag == "link" and "canonical" in (a.get("rel") or "").split():
            self.canonical = a.get("href", "")
        if tag == "a" and a.get("href"):
            self.links.add(a["href"])
        if tag == "script" and a.get("type") == "application/ld+json":
            self.ld = ""

    def handle_data(self, data):
        if self.tag == "title":
            self.title += data
        if self.ld is not None:
            self.ld += data

    def handle_endtag(self, tag):
        if tag == "script" and self.ld is not None:
            try:
                self.schemas.append(json.loads(self.ld))
            except ValueError:
                self.schemas.append(None)
            self.ld = None
        self.tag = ""


def fetch(path):
    return requests.get(path, timeout=(5, 20), allow_redirects=False,
                        headers={"User-Agent": "ESOM-Search-Console/1.0"})


def crawl():
    sitemap = fetch(ORIGIN + "/sitemap.xml")
    sitemap.raise_for_status()
    xml = ElementTree.fromstring(sitemap.content)
    locs = [node.text for node in xml.findall("{*}url/{*}loc") if node.text]
    urls = list(dict.fromkeys(url for url in locs if url.startswith(ORIGIN + "/") or url == ORIGIN))
    if not urls:
        raise ValueError("No ESOM URLs in the sitemap.")
    robots = fetch(ORIGIN + "/robots.txt")
    robots.raise_for_status()
    rules = RobotFileParser()
    rules.parse(robots.text.splitlines())

    def check(url):
        row = {"Page": urlsplit(url).path or "/", "HTTP": None, "Title": "", "Issues": []}
        links = set()
        try:
            response = fetch(url)
            row["HTTP"] = response.status_code
            page = Page()
            page.feed(response.content.decode(response.encoding if response.encoding and response.encoding.lower() != "iso-8859-1" else "utf-8"))
            row["Title"] = page.title
            if response.status_code != 200:
                row["Issues"].append("HTTP " + str(response.status_code))
            if page.canonical.rstrip("/") != url.rstrip("/"):
                row["Issues"].append("Canonical missing or different")
            if not page.title or not page.description:
                row["Issues"].append("Missing title or description")
            if page.h1 != 1:
                row["Issues"].append(f"{page.h1} main headings")
            if "noindex" in (page.robots + response.headers.get("X-Robots-Tag", "")).lower():
                row["Issues"].append("Noindex")
            if not page.schemas or None in page.schemas:
                row["Issues"].append("Missing or invalid JSON-LD")
            for bot in ("Googlebot", "bingbot", "OAI-SearchBot"):
                if not rules.can_fetch(bot, url):
                    row["Issues"].append(bot + " blocked in robots.txt")
            links = {urljoin(url, link).split("#")[0].split("?")[0].rstrip("/") for link in page.links}
        except (requests.RequestException, ValueError, LookupError) as exc:
            row["Issues"].append(str(exc))
        return url.rstrip("/"), row, links

    with ThreadPoolExecutor(max_workers=4) as workers:
        pages = list(workers.map(check, urls))
    titles = Counter(r["Title"] for _, r, _ in pages)
    for url, row, _ in pages:
        if row["Title"] and titles[row["Title"]] > 1:
            row["Issues"].append("Duplicate title")
        if url != ORIGIN and not any(url in links for source, _, links in pages if source != url):
            row["Issues"].append("No incoming link found within sitemap pages")
        row["Issues"] = " · ".join(row["Issues"])
    return [row for _, row, _ in pages]
