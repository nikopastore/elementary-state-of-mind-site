# ESM_APEX_301_1 — Proposal: apex → www must be permanent (308), not 307

**Status: PROPOSAL ONLY. Nothing has been applied, committed, pushed, or deployed.**
Owner: Hermes · Date: 2026-10-15 · Repo: `nikopastore/elementary-state-of-mind-site`

---

## 1. Finding — where the 307 comes from

It is **not** in the repo. Verified: repo has **no `vercel.json`**, **no `middleware.ts`**, and
`next.config.ts` is empty (`{}` of options). No code path can emit the redirect.

It is a **Vercel project-level domain redirect**, stored in Vercel's control plane:

`GET https://api.vercel.com/v9/projects/elementary-state-of-mind-site/domains/elementarystateofmind.com`

```json
{
  "name": "elementarystateofmind.com",
  "projectId": "prj_HnB6Wto0Bb7Wu7owyPZgkdjpzrn",
  "redirect": "www.elementarystateofmind.com",
  "redirectStatusCode": null,        <-- null => Vercel defaults to 307
  "verified": true
}
```

`redirectStatusCode: null` is the entire bug. Vercel's edge serves the default **307 Temporary**.
The target `www.elementarystateofmind.com` is assigned to the same project with
`redirect: null` (serves content, HTTP 200) — that part is correct.

DNS is fine and needs no change (`verified: true` on both):
- apex `elementarystateofmind.com` → `A 76.76.21.21` (Vercel anycast)
- `www.elementarystateofmind.com` → `CNAME cname.vercel-dns.com`
- NS `ns1/ns2.dns-parking.com` (Hostinger parking DNS — apex uses an A record, not an alias)

## 2. Do NOT "fix" this with a PR

A `vercel.json` `redirects` rule (or `next.config.js` `redirects()` / `middleware.ts`) **will not fire.**
The apex hostname is assigned to the project as a *redirect domain*, so Vercel's edge resolves the
hostname redirect during routing — before any project config or route is evaluated. The request never
reaches the app, so a config-level rule would sit there dead. It would also add a needless redeploy.
(Vercel documents domain redirects and configuration redirects as two separate mechanisms;
firewall rules are the only thing documented to preempt config redirects.)

**Therefore this is a one-call control-plane change, not a code change.** No PR is the correct deliverable.

## 3. The fix (ONE call — either path)

Target state: `elementarystateofmind.com` → `www.elementarystateofmind.com` with
`redirectStatusCode: 308` (permanent; 301 also accepted).

### Path A — API one-liner (Niko can approve; Hermes can run it on "go")

```bash
T=$(python3 -c "import json;print(json.load(open('$HOME/.vercel/auth.json'))['token'])")
curl -sS -X PATCH \
  "https://api.vercel.com/v9/projects/elementary-state-of-mind-site/domains/elementarystateofmind.com?teamId=team_OOq3oGJ9uQQOjtN0E8PRhccq" \
  -H "Authorization: Bearer $T" -H "Content-Type: application/json" \
  -d '{"redirect":"www.elementarystateofmind.com","redirectStatusCode":308}'
```

Reversal (rollback to current behaviour):
`-d '{"redirect":"www.elementarystateofmind.com","redirectStatusCode":307}'`

Notes: read access on this token is already proven (`GET` of the same endpoint returns 200;
`vercel whoami` → `nikopastore`, team `niko-pastores-projects`). Endpoint accepts
`redirectStatusCode` enum `[301, 302, 307, 308]`. Takes effect at the edge immediately — no build,
no deploy, no cost, no downtime. Team scope param is `team_OOq3oGJ9uQQOjtN0E8PRhccq`.

### Path B — Dashboard clicks (only Niko can do this)

1. Open https://vercel.com/niko-pastores-projects/elementary-state-of-mind-site/settings/domains
2. Find the row `elementarystateofmind.com` (not the `www.` row).
3. Click **Edit** (three-dot menu → Edit) on that row.
4. In the **Redirect to** dropdown keep `www.elementarystateofmind.com`.
5. Set the redirect status code to **308 Permanent** (if the modal only offers Temporary, use Path A).
6. **Save**.

## 4. Verification (acceptance criterion)

```bash
curl -I https://elementarystateofmind.com | head -3
# expect: HTTP/2 308  +  location: https://www.elementarystateofmind.com/

curl -sS -o /dev/null -w '%{http_code} -> %{url_effective}\n' -L https://elementarystateofmind.com/
# expect: 200 -> https://www.elementarystateofmind.com/   (still exactly 1 hop)
```

Current (pre-fix) measured values, for comparison:
```
https://elementarystateofmind.com/     307  location: https://www.elementarystateofmind.com/
http://elementarystateofmind.com/      308  -> https://elementarystateofmind.com/   (Vercel HTTPS enforcement, already permanent)
https://www.elementarystateofmind.com/ 200
```

Post-fix chain becomes: `http://` → 308 → `https://apex` → 308 → `https://www` → 200. Two permanent
hops, zero 307s. If Niko wants a single hop from `http://`, that would mean moving DNS off Vercel's
HTTPS enforcement — not recommended, out of scope.

## 5. Do NOT flip the direction

The repo already decided `www` is canonical: PR #1 (`6033c8d` "Canonicalize all references to
www.elementarystateofmind.com") is merged and live. Confirmed on the deployed build
(`6033c8d`, production, READY):
- `metadataBase` + every `alternates.canonical` → `https://www.elementarystateofmind.com`
- `sitemap.ts` baseUrl, `robots.txt` Sitemap: → `https://www.elementarystateofmind.com`
- Live HTML `<link rel="canonical" href="https://www.elementarystateofmind.com/about">`

So: keep apex → www. Only the status code changes.

## 6. Cost / risk

- $0. No new Vercel scope, no build minutes consumed, no config redeploy.
- Reversible with one PATCH (see Path A rollback).
- Blast radius: one hostname redirect status. `www` serving path untouched.