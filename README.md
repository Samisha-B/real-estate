# ESTATE & CO. — Real Estate Website Template

A premium, responsive real estate website template built with Next.js 14 (App Router) + TypeScript. Demo brand: **ESTATE & CO.** — every brand detail is configurable, nothing is hardcoded in components.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploy to Vercel by importing the repo (no env vars required).

## Customize (all content lives in two folders)

| File | What it controls |
|---|---|
| `config/site.ts` | Brand name, logo, colors, fonts, hero copy/images, office, phone, email, hours, social links, service areas, form endpoint |
| `data/properties.ts` | All listings: price, address, photos, specs, amenities, features, status |
| `data/agents.ts` | Agent profiles, bios, previous sales |
| `data/neighborhoods.ts` | Neighborhood pages, average prices (editable) |
| `data/testimonials.ts` | Reviews (demo ones are labelled) |
| `data/blog.ts` | Articles |
| `data/faq.ts` | FAQ items |
| `data/images.ts` | Image pool (Unsplash demo photos) — replace with your own URLs or `/public` files |

## Forms & backend

Forms validate on the client. With `formEndpoint` empty in `config/site.ts`, they run in **demo mode**: nothing is sent and the UI says so. Set `formEndpoint` to a Formspree / Basin / your own API URL and forms will POST JSON (`action`, fields) to it and show a real success state.

## Notes

- Demo photos are hot-linked from Unsplash; replace them before going live (licensing, reliability).
- Maps use OpenStreetMap / Google embeds (no API key).
- Legal pages are templates; have counsel review them. Listings must comply with local MLS and Fair Housing rules.
- Favorites persist in `localStorage`.
