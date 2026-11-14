# Nkoko Joel Nkoko · Portfolio

Personal portfolio of Nkoko Joel Nkoko, full-stack software engineer in Buea, Cameroon.

A pnpm monorepo where each part deploys on its own:

| Part | Folder | Hosted on | What it does |
| --- | --- | --- | --- |
| Website | `frontend/` | **Vercel** (`vercel.json`) | React 19 + Vite + Tailwind CSS 4 single-page site |
| API | `backend/` | **Render** | Express 5 API: receives contact messages and emails them to you |
| Database | `database/` | **PostgreSQL** (Neon or Render) | Stores every contact message (Drizzle ORM + SQL migrations) |
| Shared code | `shared/` | – | Contact form validation used by both the website and the API |
| Media | `frontend/public/media/` | **Cloudinary** | Profile photo, CV and project screenshots |

```
Visitor ─▶ Vercel (website) ── /api/* ──▶ Render (API) ──▶ PostgreSQL
                │                              └──────────▶ Resend ──▶ your Gmail
                └── images & CV ──▶ Cloudinary CDN
```

## Editing the content

All text, links, projects, experience and skills live in one file:
**`frontend/src/content.ts`**. Change it, push, and Vercel redeploys.

- A link left as `""` is hidden (for example `tiktok`, or a project's `liveUrl`).
- Project screenshots go in `frontend/public/media/` (WebP, about 1280×720). Set
  `image: "project-name.webp"` on the project, then run `pnpm media:upload`.
- To update the CV, replace `frontend/public/media/nkoko-joel-nkoko-cv.pdf` and
  run `pnpm media:upload`.

## Run it on your computer

Needs Node.js 22.12+ and a PostgreSQL database.

```bash
corepack enable
pnpm install
cp backend/.env.example backend/.env    # then set DATABASE_URL
pnpm dev:backend                        # API on http://localhost:8080 (applies migrations)
pnpm dev:frontend                       # site on http://localhost:5173
```

## Deploying (one time)

### 1. Database: PostgreSQL on Neon (free)

1. Create a project at [neon.tech](https://neon.tech), region **AWS Europe (Frankfurt)**.
2. Copy the connection string (`postgresql://...?sslmode=require`). That is your `DATABASE_URL`.

Render's own free PostgreSQL also works, but it is deleted after 30 days; Neon's free plan is not.
The tables are created automatically the first time the API starts.

### 2. Email: Resend (free)

Render's free plan blocks normal email (SMTP), so the API sends email through Resend's web API.

1. Sign up at [resend.com](https://resend.com) **with nkokomoukan@gmail.com**.
2. Create an API key. That is your `RESEND_API_KEY`.

Without your own domain, Resend only delivers to the email address you signed up with,
which is exactly what the contact form needs. Replying to a notification replies to the visitor.

### 3. API: Render

1. In [Render](https://render.com): **New → Blueprint**, pick this repository. It reads `render.yaml`.
2. Fill in the secret values: `DATABASE_URL`, `RESEND_API_KEY`, and
   `CORS_ORIGIN` = `https://nkokoportfolio.vercel.app`.
3. When it is live, open `https://nkoko-portfolio-api.onrender.com/api/healthz`. It should show `{"ok":true}`.

If Render gives the service a different address, put that address in `vercel.json` (the `/api/:path*` rewrite).

### 4. Media: Cloudinary

1. From the [Cloudinary console](https://console.cloudinary.com), copy the cloud name, API key and API secret into `backend/.env`.
2. Upload everything in `frontend/public/media`:
   ```bash
   pnpm media:upload
   ```
3. In Cloudinary **Settings → Security**, turn on **Allow delivery of PDF and ZIP files**
   (free accounts block PDF downloads by default, which would break "Download CV").
4. In Vercel, set `VITE_CLOUDINARY_CLOUD_NAME` to your cloud name (step 5) and redeploy.

Until step 4 is done, the site serves the same files from Vercel, so nothing breaks in the meantime.

### 5. Website: Vercel

Nothing to change in **Settings → Build and Deployment**: leave **Root Directory** empty (the repository root).
The root `vercel.json` installs the workspace, builds only the website and publishes `frontend/dist`.

**Settings → Environment Variables** (optional):

| Name | Value |
| --- | --- |
| `VITE_CLOUDINARY_CLOUD_NAME` | your Cloudinary cloud name |
| `VITE_SITE_URL` | only if the domain changes (default `https://nkokoportfolio.vercel.app`) |

The website calls `/api/...` on its own domain and Vercel forwards it to Render, so no CORS setup is needed in the browser.

## Notes

- **Render free plan sleeps** after 15 minutes without visitors. The website wakes it as soon as
  someone opens the page, and the form says "waking up the server" if the first send takes longer.
- **No message is ever lost**: each one is saved to the database before the email is sent. If
  sending fails, the row keeps `emailed = false` and the reason in `email_error`.
- **Spam protection**: a hidden honeypot field, and at most 5 messages per visitor every 15 minutes.
- **Database changes**: edit `database/src/schema.ts`, run `pnpm db:generate`, commit the new SQL file
  in `database/migrations/`. It is applied on the next API start.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev:frontend` / `pnpm dev:backend` | Run locally |
| `pnpm build` | Build everything |
| `pnpm typecheck` | Type-check every package |
| `pnpm db:generate` | Create a SQL migration from schema changes |
| `pnpm db:migrate` | Apply migrations to `DATABASE_URL` |
| `pnpm media:upload` | Upload `frontend/public/media` to Cloudinary |
