# Nkoko Joel Nkoko · Portfolio

Personal portfolio of Nkoko Joel Nkoko, full-stack software engineer in Buea, Cameroon.

A pnpm monorepo where each part deploys on its own:

| Part | Folder | Hosted on | What it does |
| --- | --- | --- | --- |
| Website | `frontend/` | **Vercel** (`vercel.json`) | React 19 + Vite + Tailwind CSS 4 single-page site |
| API | `backend/` | **Render** | Express 5 API: receives contact messages and emails them to you |
| Database | `database/` | **PostgreSQL** (Neon or Render) | Stores every contact message (Drizzle ORM + SQL migrations) |
| Shared code | `shared/` | – | Contact form validation used by both the website and the API |
| Media | `frontend/public/media/` | **Vercel** (with the website) | Profile photo, CV and project previews |

```
Visitor ─▶ Vercel (website) ── /api/* ──▶ Render (API) ──▶ PostgreSQL
                                               └──────────▶ Resend ──▶ your Gmail
```

## Updating your site

Everything is done on GitHub (website or app): edit a file, **Commit changes**, and Vercel
puts the new version online within about a minute.

| I want to… | Do this |
| --- | --- |
| Change text, links, experience or skills | Edit **`frontend/src/content.ts`** |
| Add a project | In `content.ts`, copy one block inside `projects`, change it. The **first** project is the big one. |
| Add a live link to a project | Put the address in its `liveUrl: ""` |
| Add my TikTok | Put the profile address in `tiktok: ""` |
| Replace my CV | Upload the new PDF to `frontend/public/media/` with the **same name**: `nkoko-joel-nkoko-cv.pdf` |
| Replace my photo | Upload a new `profile.jpg` (portrait, about 900 px tall) to `frontend/public/media/` |
| Add a project picture | Upload a `.webp`, `.jpg` or `.png` (about 1280×720) to `frontend/public/media/` and set `image: "file-name.webp"` on the project |

Rules of thumb: anything left as `""` is hidden; keep the quotes and commas as they are.

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
   `CORS_ORIGIN` = `https://nkoko-portfolio.vercel.app`.
3. When it is live, open `https://nkoko-portfolio-api.onrender.com/api/healthz`. It should show `{"ok":true}`.

If Render gives the service a different address, put that address in `vercel.json` (the `/api/:path*` rewrite).

### 4. Website: Vercel

Nothing to change in **Settings → Build and Deployment**: leave **Root Directory** empty (the repository root).
The root `vercel.json` installs the workspace, builds only the website and publishes `frontend/dist`.

**Settings → Environment Variables** (optional):

| Name | Value |
| --- | --- |
| `VITE_SITE_URL` | only if the domain changes (default `https://nkoko-portfolio.vercel.app`) |

The website calls `/api/...` on its own domain and Vercel forwards it to Render, so no CORS setup is needed in the browser.

**Visitor statistics**: the site includes Vercel Web Analytics. Turn it on once in Vercel → project → **Analytics** → **Enable**.

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
