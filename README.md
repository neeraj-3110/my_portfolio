# Neeraj Pal — 3D Portfolio

React + Vite + Three.js (React Three Fiber) + Motion + Tailwind CSS v4. Deploys to Vercel with zero config.

## Run it

```bash
npm install
cp .env.example .env      # then add your Web3Forms key (see below)
npm run dev               # http://localhost:5173
npm run build             # production build to /dist
npm run preview           # serve the production build locally
```

## Project structure

```
public/
  favicon.svg
  resume/Neeraj_Pal_Resume.pdf   <- put your resume here (see below)
src/
  main.jsx, App.jsx, index.css
  pages/Home.jsx
  components/
    Navbar, Hero, About, Stats, Skills, Experience, Projects, ProjectCard,
    ProjectModal, ProjectVisual, Education, Certifications, ResumeCTA,
    Contact, FinalCTA, Footer, LoadingScreen, Cursor
    3d/   HeroScene, FloatingSphere, FloatingParticles, ContactScene, SceneBoundary
    ui/   Button, GlassCard, Section, SectionHeading, AnimatedText, Icons
  data/   site.js, projects.js, skills.js, experience.js, certifications.js
  hooks/  useMedia, useInView, useActiveSection
```

All content lives in `src/data/`. Edit those files, not the components.

## Contact form (Web3Forms)

1. Go to https://web3forms.com and create a free access key using `neeraj4630@gmail.com`.
2. Local: put it in `.env` as `VITE_WEB3FORMS_ACCESS_KEY=...`
3. Vercel: Project → Settings → Environment Variables → add `VITE_WEB3FORMS_ACCESS_KEY` (all environments), then redeploy.

Web3Forms keys are designed to be used from the browser, so this is not a private secret. The env var keeps it out of git and easy to rotate.
Until a key is set, the form shows a clear "not set up yet" message with your email instead of failing silently.

## Replace the resume

Save your PDF as `public/resume/Neeraj_Pal_Resume.pdf` (exact name). Both "Download Resume" buttons, the Resume section and the final CTA all use it.
To use another filename, change `site.resume` in `src/data/site.js`.

## Replace GitHub / LinkedIn / certificate / repo links

- Profile links: `src/data/site.social` in `src/data/site.js`
- Project repos: `github` field per project in `src/data/projects.js`
- Certificates: `url` field per item in `src/data/certifications.js`

Empty values render a visibly disabled "coming soon" button, so no link is fake. Fill in a URL and it becomes a real link automatically.

## Deploy to Vercel

1. Push this folder to a GitHub repo (`.env` and `node_modules` are git-ignored).
2. vercel.com → Add New → Project → import the repo. Vercel auto-detects Vite (build `npm run build`, output `dist`).
3. Add `VITE_WEB3FORMS_ACCESS_KEY` under Environment Variables, then Deploy.

Optional: add an `og:image` meta tag in `index.html` with an absolute URL (e.g. `https://your-domain.com/og.png`) so link previews show an image.
