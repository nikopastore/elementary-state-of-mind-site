# ESOM Search Console

A private desktop dashboard and read-only stdio MCP server for Elementary State of Mind. The public crawl and Google CSV/ZIP import work immediately. Use Python 3.11 or newer.

## Start the dashboard

On Windows run `Start-Console.ps1` in this folder. On macOS or Linux create a virtual environment, install `requirements.txt`, then run `python -m streamlit run app.py --server.address 127.0.0.1 --server.port 8765 --browser.gatherUsageStats false`. Open http://127.0.0.1:8765 on that computer.

## Connect first-party data

1. In your [Google Cloud project](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com), enable the Google Search Console API. For assistant referral reports, also enable the Google Analytics Data API.
2. In Google Auth Platform, configure the audience. For an external app in Testing, add the Google account with ESOM property access as a test user. Under Clients, create a **Desktop app** OAuth client and download its JSON.
3. Select that file in the local dashboard. Select Analytics too if you want GA4 referrals. Click **Connect Google** and approve the read-only scopes in your browser. For GA4, enter the site's numeric property ID from Analytics Admin.
4. Choose a reporting window and click **Load Search Console data**. Exports from the English Google Search Console interface can also be analyzed under **Import a Google Search Console export**. The original ZIP includes daily totals. An individual Queries CSV only covers visible queries.
5. Click **Crawl the public site** for a current technical check. **Inspect indexed URL** reads Google's last known index record. A successful crawl or sitemap entry does not establish that Google has indexed the page.

## Use with a local MCP client

Select **Enable local assistant access** in the connected dashboard to store the Google grant in your OS credential vault. Add a stdio server to the MCP client with the absolute virtual-environment Python executable as its command and the absolute path to `server.py` as its only argument. No HTTP endpoint or publicly hosted admin dashboard is involved. The public crawl works without this grant. Select **Remove saved assistant access** to erase the locally saved grant. You can revoke the Google authorization from your Google Account.

The server exposes `search_performance`, `inspect_indexed_url`, `audit_public_site` and `assistant_referrals`. Query/page tables are limited to Google's top 25,000 rows per dimension. Period totals are independent API queries. Assistant referrals count identifiable visits from selected domains. They do not measure answer citations or all Google AI traffic.
