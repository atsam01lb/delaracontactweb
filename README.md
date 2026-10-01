# Colart Links

**Everything You Need. One Link.**

The Colart Links directory: one home for every business, brand and creator powered by Colart.

🔗 **Live:** https://links.colartdigitalmarketingagency.com
🏢 **Powered by:** [Colart Digital Marketing Agency](https://colartdigitalmarketingagency.com)

---

## Repository structure

```
/ (repo root)
├── index.html          Main directory page (hero, search, profile grid)
├── links.css           Directory styles (Colart brand tokens, Lato)
├── links.js            Directory logic (cards, search, filters, hero visual)
├── clients.js          Client list that feeds the directory
├── 404.html            Page shown for links that don't exist
├── CNAME               Custom domain for GitHub Pages
├── README.md
│
├── assets/             Directory-only assets
│   ├── colart-logo.svg
│   ├── colart-mark.svg
│   └── favicon.png
│
├── colart/             One folder per profile
│   ├── index.html      The profile page
│   ├── style.css       This profile's own styling
│   └── assets/
│       └── logo.svg    This profile's own assets
├── delarabitar/
├── nakhakhasa/
├── abouhamzerestaurant/
└── josephfarah/
```

Each profile folder is self-contained. Editing one profile's `style.css` or assets never affects the directory or any other profile.

## Profile URLs

| Profile | URL |
|---|---|
| Colart | `links.colartdigitalmarketingagency.com/colart/` |
| Delara Bitar | `links.colartdigitalmarketingagency.com/delarabitar/` |
| Nakha Khasa · نكهة خاصة | `links.colartdigitalmarketingagency.com/nakhakhasa/` |
| Abou Hamze Restaurant | `links.colartdigitalmarketingagency.com/abouhamzerestaurant/` |
| Joseph Farah | `links.colartdigitalmarketingagency.com/josephfarah/` |

---

## Add a new client

1. **Duplicate a profile folder.** Copy any folder (for example `josephfarah/`) and rename it to the new slug. Use lowercase with no spaces, for example `newbrand/`.
2. **Edit the profile.**
   - In `newbrand/index.html`, update the `<title>`, meta description, canonical and OG URLs, name, category, and Arabic name if there is one.
   - In `newbrand/style.css`, set the brand color in `--accent` at the top.
   - Replace `newbrand/assets/logo.svg` with the client's logo. A PNG or JPG also works if you update the `<img src>` in `index.html`.
3. **Add the client to the directory.** Add an entry in `clients.js`:

   ```js
   {
     slug: "newbrand",
     name: "New Brand",
     nameAr: "اسم عربي",        // optional
     category: "Fashion & Retail",
     accent: "teal"             // optional: teal | mint | magenta | yellow | lime | purple
   }
   ```
4. **Commit and push.** The card, search, category filters, profile count and hero visual all update automatically.

### `clients.js` fields

| Field | Required | Description |
|---|---|---|
| `slug` | ✅ | Folder name, which also becomes the URL |
| `name` | ✅ | Display name |
| `category` | ✅ | Short description or category. Category filters are generated from this field. |
| `nameAr` | — | Arabic name. It is displayed and searchable. |
| `logo` | — | Logo path. Defaults to `<slug>/assets/logo.svg`. |
| `logoFit` | — | `"cover"` (default) fills the circle; `"contain"` shows the logo with padding. |
| `accent` | — | Card accent color from the Colart palette. Auto-assigned if omitted. |

## Add links to a profile

Open the profile's `index.html`. Uncomment the `<ul class="links">` block, add the links, and delete the `<div class="soon">` placeholder:

```html
<ul class="links">
  <li><a href="https://instagram.com/..." target="_blank" rel="noopener">Instagram</a></li>
  <li><a href="https://wa.me/961..." target="_blank" rel="noopener">WhatsApp</a></li>
  <li><a href="https://maps.google.com/..." target="_blank" rel="noopener">Location</a></li>
</ul>
```

## Remove a client

1. Delete the client's entry from `clients.js`.
2. Delete the client's folder.

---

## Deployment (GitHub Pages)

1. Push the repo contents to the root of the `main` branch.
2. In the repo, go to **Settings → Pages → Source** and select **Deploy from a branch**, then choose `main` and `/ (root)`.
3. Make sure `CNAME` contains `links.colartdigitalmarketingagency.com`.
4. In Namecheap, go to **Advanced DNS** and add this record:

   | Type | Host | Value |
   |---|---|---|
   | CNAME | `links` | `atsam01lb.github.io` |

5. Once DNS propagates, enable **Enforce HTTPS** in the Pages settings.

## Local preview

Open `index.html` directly in a browser, or run a local server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Brand

| Token | Hex |
|---|---|
| Purple | `#642878` |
| Magenta | `#C81478` |
| Teal | `#50A0B4` |
| Mint | `#64A08C` |
| Lime | `#8CB43C` |
| Yellow | `#DCDC3C` |

**Font:** Lato for English text; Noto Kufi Arabic for Arabic names.

---

© Colart Digital Marketing Agency · *We Create… You Grow!*
