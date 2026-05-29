# FORMALAB PRO

Production frontend for a premium custom furniture and architectural millwork studio. The site presents private interiors, HoReCa, retail fixtures, engineering process, materials, project cases and a client brief.

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lenis smooth scrolling

## Features

- Responsive single-page site for desktop and mobile.
- Two visual modes with a client-facing theme switcher.
- SEO metadata, Open Graph tags and JSON-LD markup.
- Project gallery with category filtering and detailed case views.
- Engineering, materials, process, trust, FAQ and contact brief sections.
- Client-side validation for the project brief.
- Root-path production build for Timeweb Cloud.

## Development

```bash
npm install
npm run dev
```

Local URL:

```text
http://127.0.0.1:5173/
```

## Quality Checks

```bash
npm run lint
npm run build
npm run preview
```

For production domains where the site is served from `/`:

```bash
VITE_BASE_PATH=/ npm run build
```

## Project Structure

```text
src/
  components/       page sections and shared UI
  components/v2/    alternative light visual mode
  data/             site copy and structured section data
  hooks/            browser and interaction hooks
  lib/              shared utilities
  types/            TypeScript contracts
public/
  gallery/          gallery images
  projects/         project case images
  images/           additional visual assets
```

## Deployment

Production is deployed from the `main` branch to the existing Timeweb Cloud app.

Production URL:

```text
https://formalabpro.tech/
```
