# Uncharted Ventures — website

A dependency-free static site (no build step) for Uncharted Ventures, a consultancy and solution provider for the age of AI, robotics, and automation.

## Structure

```
uncharted-ventures/
├─ index.html          Home
├─ approach.html       What We Do / operating model
├─ industries.html     Industries served (eight sectors)
├─ our-work.html       Our Work / engagement models
├─ about.html          About / leadership
├─ contact.html        Talk to us + inquiry form
├─ vercel.json         Static hosting config (clean URLs, asset caching)
├─ 
│  ├─ style.css        Design system (one file)
│  ├─ app.js           Nav + scroll reveal
│  ├─ logo-white.png   Wordmark (for dark backgrounds)
│  ├─ logo-black.png   Wordmark (for light backgrounds)
│  └─ favicon.png
└─ README.md
```

No framework, no build. Open `index.html` in a browser, or serve the folder.

## Local preview

```bash
cd uncharted-ventures
python3 -m http.server 8080    # then visit http://localhost:8080
```

## Deploy on Vercel

This repo (`roothold/uncharted`) is currently a Vite app. To ship this static version:

1. **Archive the current site first** (see below).
2. Replace the repo contents with the files in this folder and push to `main`.
3. In the Vercel project → **Settings → Build & Development**:
   - Framework Preset: **Other**
   - Build Command: **(leave empty)**
   - Output Directory: **(leave empty — serves the repo root)**
   - Install Command: **(leave empty)**
4. Redeploy. Vercel serves the static files directly.

## Point the domain (GoDaddy → Vercel)

1. In Vercel → project → **Settings → Domains**, add `uncharted.ventures` and `www.uncharted.ventures`.
2. Vercel shows the exact records. In **GoDaddy → Domain → DNS**, set:
   - `A` record `@` → `76.76.21.21` (Vercel's apex IP, confirm the value Vercel shows you)
   - `CNAME` record `www` → `cname.vercel-dns.com`
3. Remove any old conflicting `A`/`CNAME` records for `@` and `www`.
4. Back in Vercel, set the primary domain and let it issue the SSL certificate. Propagation is usually minutes to a few hours.

## Archive the existing site

Preserve the current Vite site before overwriting `main`:

```bash
git clone https://github.com/roothold/uncharted.git
cd uncharted
git tag v1-legacy-vite            # snapshot in history
git branch archive/legacy-site    # keep a named branch
git push origin v1-legacy-vite archive/legacy-site
# then replace files on main with this static site and push
```

The old deployment at `uncharted-ashen.vercel.app` stays live until you remove it in Vercel.

## Three things to wire up

1. **Contact form** — `contact.html` posts to a placeholder Formspree endpoint. Create a form at formspree.io and replace `https://formspree.io/f/your-form-id` with your endpoint (or swap in any form handler).
2. **Email address** — the site lists `michael@uncharted.ventures`. Confirm that mailbox exists, or replace it with your real address.
3. **Imagery** — photos are loaded from LoremFlickr (keyworded placeholder service) as `background-image` URLs in the HTML, so the layout renders with on-theme photography out of the box. For production, replace these with licensed or branded photography: drop files in `` and swap the `url('https://loremflickr.com/...')` values. Search each file for `loremflickr` to find them.
