# Company Website — Project Brief

This file gives Claude Code the context for building this project. Read it fully before starting any task.

## Overview

A static, multi-page website for a client company. The client already owns the domain. Designs/wireframes were made by the client in **Visily** and are the visual source of truth.

- **Developer:** Jay (Cyberproximity)
- **Client / company name:** First Fruits — tagline "Awakening Eco-Spiritual Consciousness"
- **Domain:** 1st-fruits.org
- **Site type:** Static, content-focused company site with many pages

## Tech Stack

| Area | Choice |
|---|---|
| Framework | **Astro** (static output, `.astro` components) |
| Styling | **Tailwind CSS v4** (via `@tailwindcss/vite`) |
| Interactivity | Minimal vanilla JS. **No React** unless a component genuinely needs client-side state |
| Content | Astro **content collections** (Markdown) for repeating page types |
| Images | Astro `<Image />` / `<Picture />` for optimization (WebP) |
| Contact form | **Web3Forms** |
| Hosting | **Cloudflare Pages** (free, commercial use allowed) |
| DNS | **Cloudflare** (nameservers moved from registrar) |
| Email | `info@<domain>` purchased from the domain vendor |
| Repo | GitHub |

## Design Source: Visily

- Designs live in Visily. Use the **Visily MCP** to read boards/screens and pull theme tokens.
- The Visily MCP defaults to React + TypeScript + Tailwind + shadcn/ui. **Ignore that default.** Always output Astro components (`.astro`) with Tailwind classes.
- Treat Visily designs as a **visual reference**, not code to paste. Rebuild clean, semantic, reusable components.
- Many Visily wireframes are desktop-only. Build **mobile-first** and adapt layouts responsively where mobile views are missing.
- Placeholder text in Visily may not be final. Keep copy easy to replace (preferably in content collections or clearly marked).
- Image assets (photos, logos) should come from the client as original files, not Visily exports. Use placeholders until provided.

## Design Decisions (confirmed by Jay, 2026-09-29)

- **Visily MCP is not available** (subscription expired). The design source is the static exports in `designs/` (25 desktop-only JPGs). They are AI concept drafts under many brand names; rebrand everything as First Fruits.
- **Brand colour is red**, taken from the logo and the live-site screenshot (`first fruits.jpeg`), not the green used in the Visily exports. Swap every green in the designs for the brand red tokens.
- **All topics are in scope**, including VEG ELITES profiles, World Vegan Day, plant-based meal plans and the learning hub.
- **Duplicate screens get merged.** Where several screens cover one page (team, manifesto, home), combine their best sections into one page.
- **No login or sign-up** anywhere. Keep a **Donate** button in the header; it links to `/contact` until a donation page exists.
- Site name, navigation and footer links live in `src/data/site.ts`.
- The logo in `src/assets/brand/` is a temporary crop from the screenshot. Replace it with the client's original file.

### Placeholder content to replace before launch

- Photos in `src/assets/placeholders/`: free Unsplash stock photos (credits in that folder's README), used until the client sends their own. The logo in `src/assets/brand/` is still a crop from the screenshot.
- Team members (`src/content/team/`), VEG ELITES profiles except Mohanji (`src/content/profiles/`), and all testimonials: invented names from the drafts.
- Impact figures and the "10 Million by 2030" goal (`src/pages/impact.astro`, `src/pages/index.astro`): made-up numbers from the drafts.
- Mohanji's biography: confirm with his team. Quote attributions in `src/content/teachings.json`: verify.
- Learning hub article, video and course bodies.

### Page inventory

| Page | Route | Source screens in designs/ |
|---|---|---|
| Home | / | ecospirit-homepage, home-awakening, auragrove |
| About | /about | ecospirituality-alliance-mission-vision, asafo-cultural-authenticity |
| Manifesto | /manifesto | manifesto-our-path, manifesto-home |
| Team | /team | verdant-circle-our-team, ecosynergy-solutions-team |
| Future Vision | /vision | future-vision, call-to-action |
| What We Do | /what-we-do | first-fruits-what-we-do-1, our-solutions |
| Our Path | /our-path | first-fruits-what-we-do |
| Impact | /impact | 10-million-by-2030-impact-showcase |
| Plant-Based Living | /plant-based-living | sereneeats-homepage, veganvitality-world-vegan-day-hub |
| Teachings | /teachings | serene-wisdom-inspirational-teachings, compassion-collective |
| Learning Hub | /learn | learnsphere-educational-hub |
| VEG ELITES | /veg-elites, /veg-elites/[slug] | veg-elites-entrepreneur-guru-profiles, veg-elites-guru-mohanji, veg-elites-vegan-profile |
| Contact | /contact | none; built from the shared style |

## MCP Servers

Set these up in Claude Code:

```bash
# Visily (requires Pro/Business workspace + editor access)
claude plugin marketplace add visily-app/mcp-plugins
claude plugin install visily@visily
# then run /mcp → select visily → complete OAuth sign-in

# Astro Docs (current Astro documentation)
claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp

# Playwright (browser screenshots for visual checks)
claude mcp add playwright npx @playwright/mcp@latest
```

- Use **Astro Docs MCP** when unsure about Astro APIs (especially content collections, which changed across versions).
- Use **Playwright MCP** to screenshot pages at mobile (375px), tablet (768px) and desktop (1280px+) widths and compare against the Visily screens.

## Project Structure

```
src/
├── components/        # Header, Footer, PageHero, Section, FeatureGrid, ImageCardGrid, CTA, ContactForm, etc.
├── data/site.ts       # site name, email, navigation and footer links
├── lib/               # icons, shared types, placeholder image lookup
├── layouts/
│   └── BaseLayout.astro   # <head>, SEO meta, header, footer
├── content/           # content collections (e.g. services/, projects/)
├── content.config.ts  # collection schemas
├── pages/             # routes; dynamic [slug].astro for collections
├── styles/
│   └── global.css     # Tailwind import + design tokens (@theme)
└── assets/            # images processed by Astro (placeholders/ = TEMPORARY photos from designs)
public/                # favicon, robots.txt, static files
```

## Build Conventions

1. **Design tokens first.** Pull colors, fonts, font sizes, spacing and radius from Visily and define them once in `global.css` using Tailwind v4 `@theme`. Never hard-code hex values in components.
2. **One base layout.** All pages use `BaseLayout.astro`, which accepts `title`, `description` and optional `image` props for SEO/Open Graph.
3. **Components over repetition.** Any section used more than once becomes a component.
4. **Content collections** for repeating page types (services, projects, team, news, etc.). One template renders all entries.
5. **Accessibility:** semantic HTML, alt text on images, visible focus states, sufficient contrast, keyboard-accessible mobile menu.
6. **Performance:** zero JS by default, lazy-loaded images, no heavy libraries.
7. Keep code clean and readable — the client or another developer may maintain it later.

## SEO Basics (every page)

- Unique `<title>` and meta description
- Open Graph + Twitter tags (for WhatsApp/social link previews)
- Canonical URL
- Favicon set
- `sitemap.xml` via `@astrojs/sitemap`
- `robots.txt` in `public/`
- A custom `404.astro` page

## Contact Form (Web3Forms)

- Reusable `ContactForm.astro` component.
- POST to `https://api.web3forms.com/submit`.
- Access key stored in env var `PUBLIC_WEB3FORMS_KEY` (`.env`, not committed; add to Cloudflare Pages environment variables).
- Access key is registered to `info@<domain>` so submissions go to the company inbox.
- Include the hidden honeypot field (`botcheck`) for spam protection. Add hCaptcha later only if spam becomes a problem.
- Submit with `fetch` and show inline success/error messages (no page reload), with a plain-POST fallback redirecting to a thank-you page.

## Deployment (Cloudflare Pages)

- Connect the GitHub repo in Cloudflare → Workers & Pages → Create → Pages.
- **Build command:** `npm run build`
- **Output directory:** `dist`
- Add custom domains: `<domain>` and `www.<domain>`; redirect one to the other (single canonical URL).
- SSL is automatic; enable "Always Use HTTPS".
- Set `site` in `astro.config.mjs` to the final domain (needed for sitemap and canonical URLs).

## Launch Plan (Checklist)

### Phase 1 — Gather
- [ ] Editor access to the Visily project (Pro/Business workspace needed for MCP)
- [ ] Confirm mobile views and missing states (mobile menu, form success/error, 404)
- [ ] Final copy from client (or agree to use Visily text)
- [x] Page inventory, grouped by template type
- [ ] Logo, photos and brand assets as original files
- [ ] Contact details: phone, WhatsApp, address/map, hours, social links
- [ ] Registrar login available for nameserver change

### Phase 2 — Email (before DNS move)
- [ ] Buy email from domain vendor, create `info@<domain>`
- [ ] Test sending and receiving
- [ ] Record vendor's email DNS records: MX, SPF, DKIM, autodiscover/webmail CNAMEs

### Phase 3 — Build
- [ ] Init Astro + Tailwind v4 project, push to GitHub
- [x] Design tokens (from logo + screenshot; layout from designs/)
- [x] BaseLayout, Header (with mobile menu), Footer
- [x] Shared components
- [x] Content collections + templates
- [x] Pages built from designs/ and checked with Playwright (desktop + mobile)
- [x] Contact form (Web3Forms) — needs PUBLIC_WEB3FORMS_KEY
- [x] SEO basics, sitemap, robots.txt, 404

### Phase 4 — DNS to Cloudflare
- [ ] Add domain to Cloudflare (preferably client-owned account, Jay as member)
- [ ] Verify all email records imported; mail records set to "DNS only"
- [ ] Change nameservers at registrar
- [ ] Wait until Cloudflare shows the domain as Active

### Phase 5 — Deploy
- [ ] Create Pages project from GitHub repo
- [ ] Add env var `PUBLIC_WEB3FORMS_KEY`
- [ ] Add custom domains + www redirect
- [ ] Enable Always Use HTTPS

### Phase 6 — Test
- [ ] Form submission arrives at `info@` (not in spam)
- [ ] Email send/receive both directions from an outside account
- [ ] Mobile check, all links, tel: and WhatsApp links
- [ ] WhatsApp link preview shows correctly
- [ ] Google Search Console + submit sitemap

### Phase 7 — Handover
- [ ] Document where everything lives: registrar, Cloudflare, GitHub, Web3Forms, email provider
- [ ] Clarify account ownership and logins
- [ ] Agree on how updates will be handled

## First Task for Claude Code

1. Read this file.
2. Scaffold the Astro project with Tailwind v4, `@astrojs/sitemap`, the folder structure above, and a `.env.example` containing `PUBLIC_WEB3FORMS_KEY=`.
3. Using the Visily MCP, find the project board, list all screens, and propose a page inventory grouped by template type. **Wait for Jay's confirmation before building pages.**
4. Pull the theme tokens from Visily into `global.css`.
5. Build `BaseLayout`, `Header` and `Footer`, then check them with Playwright at mobile and desktop widths.

## Dev Server (Astro 7)

Start the dev server in background mode and manage it with the built-in commands:

```
npx astro dev --background
npx astro dev status | logs | stop
```

Astro docs guides worth checking first: routing, components, content collections, styling. Prefer the Astro Docs MCP.
