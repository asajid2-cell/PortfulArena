# Portful Arena

Physics-inspired developer portfolio built with Astro, Tailwind CSS, MDX, and selective React islands for motion-heavy interactions.

## Project goals
- Keep pages static-first while delivering inertia-driven motion and tasteful 3D.
- Author project stories in MDX so updates stay lightweight.
- Stay within free-tier hosting limits (Cloudflare Pages by default).

## Tech stack
- **Astro 4** with MDX collections for project data.
- **Tailwind CSS** with custom tokens matching the arena palette.
- **React islands** powering project cards, filters, contact form, and hero scene.
- **React Three Fiber + three** for the arena canvas with graceful fallback.
- **Framer Motion** handling spring motion and reduced-motion support.

## Getting started
```bash
npm install
npm run dev
```
Astro serves the site at http://localhost:4321 by default.

## Content workflow
- Add or edit MDX files in `src/content/projects`.
- Schema is defined in `src/content/config.ts` (summary, stack, metrics, featured flag, etc.).
- Each MDX file becomes `/projects/{slug}` automatically.
- Home pulls any project marked `featured: true`.

## Deployment
1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Create a Cloudflare Pages project:
   - Framework preset: Astro.
   - Build command: `npm run build`.
   - Build output directory: `dist`.
3. Set `NODE_VERSION` to a supported LTS (18 or newer).
4. Deploy - Cloudflare's CDN serves the static output globally.

### Optional extras
- Custom domain: purchase through Cloudflare Registrar and attach in Pages settings.
- Analytics: enable Cloudflare Web Analytics or embed Plausible/Umami in `BaseLayout.astro`.
- Forms: pass a hosted endpoint (Formspark, Basin, serverless function) to the `ContactForm`.

## Useful scripts
- `npm run dev` - start the dev server with hot reload.
- `npm run build` - create a production build inside `dist/`.
- `npm run preview` - preview the production build locally.
- `npm run lint` - run `astro check` for type and content validation.

## Next steps
- Replace the sample MDX content with real projects and assets.
- Tune telemetry numbers and copy to match your story.
- Add sound toggles or extra arena bays when you move toward v1.1 and beyond.
