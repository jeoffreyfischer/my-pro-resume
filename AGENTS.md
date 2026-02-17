# AGENTS.md

### Product vision (resume page)
- **Modern resume:** Build a single-page resume that demonstrates strong, senior-level coding skills. The UI must be **simple but impactful**—clean layout, thoughtful typography, subtle motion—not cluttered. Use modern patterns (e.g. inspired by [Magic UI](https://magicui.design/), [Aceternity](https://ui.aceternity.com/components), or [hajir.pro](https://hajir.pro/)) but **rethink and adapt**; never copy a layout 1:1.
- **Sections (fixed structure):** Intro (photo + headline), Skills, Projects, Journey (timeline of education + work), Public videos (embeds), Hobbies (e.g. video + image placeholders), Contact. Content lives in `src/data/resume.ts`; reorganise from “raw” resume into these categories (e.g. timeline merges education and professional experience).
- **Responsiveness is mandatory:** At **every step**—new sections, layout changes, or copy updates—ensure the site is **very responsive**. Test and design for: narrow mobile, tablet, and desktop. Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`), flexible layouts (flex/grid, `min-w-0`, `max-w-*`), and avoid fixed widths that break on small screens. Responsiveness is a non-negotiable requirement for every change.

### Do
- Use React 19 with TypeScript: functional components and hooks (e.g. `useState`, custom hooks in `src/hooks/`).
- Use Tailwind CSS v4 for layout and utilities; keep custom CSS in `src/index.css` (e.g. `@layer base`, `@theme`, `@custom-variant dark`).
- Use Framer Motion for section and element animations; follow existing patterns (e.g. `motion.div`, `whileInView`, `viewport={{ once: true }}`).
- **Accessibility:** Follow [WCAG](https://www.w3.org/WAI/WCAG21/quickref/) (Web Content Accessibility Guidelines) so the resume is perceivable, operable, and understandable (e.g. semantic HTML, sufficient contrast, visible focus, skip link, reduced motion support, meaningful alt text and labels).
- **Keep the resume modern and responsive:** For every UI change, consider mobile → tablet → desktop; use responsive utilities and fluid/adaptive layouts so the page looks and works well at every breakpoint.
- Prefer small, focused components and small diffs.
- Reuse existing patterns (e.g. section components in `src/components/sections/`, data in `src/data/resume.ts`, theme via `useTheme` and `data-theme` on `<html>`).
- **Content and media:** Drive all content from `resume.ts`. Use placeholders or optional fields (e.g. `embedUrl`, `imageSrc` for hobbies; intro photo, public video embed) so structure supports future content without hard-coding.

### Don't
- Do not hard-code colors; use Tailwind tokens (e.g. `zinc-900`, `blue-600`) or CSS variables defined in `@theme` / `index.css`.
- Do not add new heavy dependencies without approval.
- Do not introduce class components; keep everything function components with hooks.
- Do not ship layout or section changes without ensuring they are responsive (mobile, tablet, desktop); do not rely on fixed pixel widths that break on small viewports.

### Commands
```bash
# development (Vite)
npm run dev

# lint
npm run lint

# production build (output: dist/)
npm run build

# preview production build locally
npm run preview
```

Deployment (e.g. GitHub Pages) can be added via `.github/workflows/`; document or configure as needed.

### Safety and permissions

**Allowed without prompt:**
- Read files, list files.
- Run build to verify (`npm run build`).
- Edit existing files and add new files in `src/` and `public/`.

**Ask first:**
- `npm install` / adding or changing dependencies.
- `git push` (if deploy runs on push to main).
- Deleting files, changing permissions.
- Large refactors or changing project structure.

### Project structure
- **Entry:** `src/main.tsx` → mounts `App` into `#root`.
- **Main UI:** `src/App.tsx` – single-page resume; sections composed as children of `<main>`.
- **Sections:** `src/components/sections/` – Intro, Skills, Projects, Journey, PublicVideos, Hobbies, Contact.
- **Nav & layout:** `src/components/Nav.tsx` (theme toggle + in-page links).
- **Data:** `src/data/resume.ts` – `site`, `skills`, `timeline`, `projects`, `certifications`, `hobbies`.
- **Hooks:** `src/hooks/useTheme.ts` – theme state and toggle; theme persisted in `localStorage` and applied via `data-theme` on `<html>`.
- **Styles:** `src/index.css` – Tailwind import, `@custom-variant dark`, `@theme` (fonts, colors), base and utility styles.
- **Assets / HTML:** `index.html` at project root (title, fonts, theme script); static assets in `public/` (e.g. `public/images/`), copied to build root.
- **Config:** `vite.config.ts` (Tailwind, `@` alias), `tsconfig.json` path `@/*` → `./src/*`.

### Good and bad examples
- **Good:** Functional component with hooks (e.g. `Nav` using `useTheme`); Tailwind + `dark:` for theme; Framer Motion for scroll/entrance animations; external links with `target="_blank"` and `rel="noopener noreferrer"`; responsive layout with `sm:`, `md:`, `lg:` and flexible grids (e.g. `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`); content and media driven from `resume.ts`; simple, impactful sections without visual clutter.
- **Bad:** Class components; inline styles for colors that could use Tailwind or existing CSS variables; adding a new CSS file when `index.css` suffices; fixed-width layouts or components that break on narrow screens; copying another site’s layout instead of rethinking it.

### PR checklist
- Lint passes (`npm run lint`).
- Build passes (`npm run build`).
- For UI/layout changes: confirm the page is responsive (e.g. quick check at narrow and wide viewports).
- For UI changes: consider accessibility (focus visible, contrast, labels, reduced motion).
- Keep the diff small with a short summary.

### When stuck
- Ask a clarifying question, propose a short plan, or open a draft PR with notes.
