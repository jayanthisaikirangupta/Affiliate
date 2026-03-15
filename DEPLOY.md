# PetGearHub — Deployment Guide

This guide walks you through deploying PetGearHub end-to-end on free hosting:
- **Frontend** → Vercel
- **Backend** → Render (Docker)
- **Database** → Neon (serverless Postgres)

Estimated time: 30–45 minutes on first setup. After that, every push to `main` deploys automatically.

---

## Prerequisites

Create free accounts on each platform before starting:

| Platform | URL | What it hosts |
|----------|-----|---------------|
| Vercel | https://vercel.com | Next.js frontend |
| Render | https://render.com | NestJS backend (Docker) |
| Neon | https://neon.tech | PostgreSQL database |
| GitHub | https://github.com | Source code + CI/CD |

All tiers used in this guide are **free**. No credit card is required for Neon or Vercel. Render's free tier requires a credit card for identity verification but will not charge you.

---

## Step 1: Set Up the Neon Database

1. Sign in to [neon.tech](https://neon.tech) and click **New Project**.
2. Set the project name to `petgearhub`, choose your nearest region, and click **Create Project**.
3. Neon will create a default branch called `main` with a database called `neondb`.
4. On the project dashboard, click **Connection Details** in the left sidebar.
5. You will see two connection strings — copy both and save them somewhere safe:

   **Direct connection** (used for Prisma migrations):
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

   **Pooled connection** (used by the running app — has `-pooler` in the hostname):
   ```
   postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```

   Use the **pooled** string as `DATABASE_URL` in Render. Use the **direct** string only when running `prisma migrate` locally or in a one-off migration job.

---

## Step 2: Run Prisma Migrations Locally

Before deploying, apply the database schema from your local machine so the tables exist when the backend starts.

1. In your terminal, navigate to the backend directory:

   ```bash
   cd affiliate-site/backend
   ```

2. Create a local `.env` file (this file is git-ignored, it is only for this step):

   ```bash
   # affiliate-site/backend/.env
   DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```

   Use the **direct** (non-pooler) connection string here so Prisma can run DDL statements.

3. Run the migration:

   ```bash
   npx prisma migrate dev --name init
   ```

   This creates the `prisma/migrations/` folder with your initial SQL migration file.

4. Commit the migrations folder so Render can run `prisma migrate deploy` on startup:

   ```bash
   git add prisma/migrations/
   git commit -m "chore: add initial prisma migration"
   git push origin main
   ```

   Do **not** commit the `.env` file — it is already listed in `.gitignore`.

---

## Step 3: Deploy the Backend to Render

### Option A — Blueprint (one click, recommended)

1. Go to [dashboard.render.com](https://dashboard.render.com) and click **New → Blueprint**.
2. Connect your GitHub account and select the `Affilited` repository.
3. Render will detect `render.yaml` at the project root and pre-fill all settings.
4. Click **Apply**. Render will create the `petgearhub-backend` service automatically.
5. While the first deploy runs (it will fail until you set env vars), continue to the next step.

### Option B — Manual setup

1. Go to [dashboard.render.com](https://dashboard.render.com) and click **New → Web Service**.
2. Connect your GitHub repo and select it.
3. Fill in the settings:

   | Field | Value |
   |-------|-------|
   | Name | `petgearhub-backend` |
   | Environment | Docker |
   | Dockerfile path | `./backend/Dockerfile` |
   | Docker context | `./backend` |
   | Plan | Free |
   | Health check path | `/health` |

4. Click **Create Web Service**.

### Set environment variables in Render

In the Render dashboard for `petgearhub-backend`, go to **Environment** and add the following variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `4000` |
| `DATABASE_URL` | Your Neon **pooled** connection string |
| `JWT_SECRET` | Click **Generate** — Render will create a random secret |
| `FRONTEND_URL` | Leave blank for now — fill in after Step 4 |
| `AMAZON_ACCESS_KEY` | Your Amazon PA API access key (or leave blank) |
| `AMAZON_SECRET_KEY` | Your Amazon PA API secret key (or leave blank) |
| `AMAZON_PARTNER_TAG` | Your Amazon Associates tag (or leave blank) |
| `EBAY_APP_ID` | Your eBay developer App ID (or leave blank) |
| `EBAY_CLIENT_SECRET` | Your eBay developer client secret (or leave blank) |

After saving env vars, click **Manual Deploy → Deploy latest commit**. The build takes 3–5 minutes.

Once it is green, copy your backend URL — it will look like:
```
https://petgearhub-backend.onrender.com
```

---

## Step 4: Deploy the Frontend to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and click **Import Git Repository**.
2. Select your GitHub repo.
3. Vercel will detect Next.js automatically. Set the **Root Directory** to `frontend`.
4. Under **Environment Variables**, add:

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_API_URL` | `https://petgearhub-backend.onrender.com/api` |

5. Click **Deploy**. The build takes 1–2 minutes.

Once it is green, copy your frontend URL — it will look like:
```
https://petgearhub.vercel.app
```

---

## Step 5: Update FRONTEND_URL on Render

Now that the frontend is live, go back to Render to link them:

1. In the Render dashboard, open `petgearhub-backend` → **Environment**.
2. Set `FRONTEND_URL` to your Vercel production URL:
   ```
   https://petgearhub.vercel.app
   ```
3. Click **Save Changes**. Render will automatically redeploy with the updated CORS origin.

---

## Step 6: Set Up CI/CD Secrets in GitHub

The `deploy.yml` workflow needs four secrets. Add them in GitHub under:
**Settings → Secrets and variables → Actions → New repository secret**

### VERCEL_TOKEN

1. In Vercel, go to **Account Settings → Tokens**.
2. Click **Create Token**, give it a name like `github-actions`, and set expiration to **No Expiration**.
3. Copy the token — it is only shown once.
4. Add it to GitHub as `VERCEL_TOKEN`.

### VERCEL_ORG_ID

1. In Vercel, go to **Account Settings → General**.
2. Copy the value under **Your ID** (starts with `team_` for teams, or a plain ID for personal accounts).
3. Add it to GitHub as `VERCEL_ORG_ID`.

### VERCEL_PROJECT_ID

1. In Vercel, open your `petgearhub` project → **Settings → General**.
2. Copy the **Project ID** field.
3. Add it to GitHub as `VERCEL_PROJECT_ID`.

   Alternatively, after your first Vercel deploy the CLI creates a `.vercel/project.json` file in the `frontend/` directory containing both `orgId` and `projectId`. You can read them from there.

### RENDER_DEPLOY_HOOK_URL

1. In the Render dashboard, open `petgearhub-backend` → **Settings**.
2. Scroll to **Deploy Hook** and click **Create Deploy Hook**.
3. Copy the full URL (it includes an authentication token in the query string).
4. Add it to GitHub as `RENDER_DEPLOY_HOOK_URL`.

Once all four secrets are added, push any change to `main` and watch the **Actions** tab — both deploy jobs should turn green.

---

## Environment Variables Reference

### Backend (set in Render dashboard)

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NODE_ENV` | Runtime environment | Set to `production` |
| `PORT` | Port the server listens on | Set to `4000` |
| `DATABASE_URL` | PostgreSQL connection string | Neon dashboard → Connection Details → **pooled** URL |
| `JWT_SECRET` | Secret for signing JWT tokens | Use Render's Generate button |
| `FRONTEND_URL` | Allowed CORS origin | Your Vercel production URL |
| `AMAZON_ACCESS_KEY` | Amazon Product Advertising API key | [affiliate-program.amazon.com](https://affiliate-program.amazon.com) → Tools → Product Advertising API |
| `AMAZON_SECRET_KEY` | Amazon PA API secret | Same as above |
| `AMAZON_PARTNER_TAG` | Amazon Associates tracking tag | Amazon Associates dashboard |
| `EBAY_APP_ID` | eBay Browse API App ID | [developer.ebay.com](https://developer.ebay.com) → Application Keys |
| `EBAY_CLIENT_SECRET` | eBay API client secret | Same as above |

### Frontend (set in Vercel dashboard)

| Variable | Description | Where to get it |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Your Render service URL + `/api` |

### GitHub Actions secrets

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel personal access token |
| `VERCEL_ORG_ID` | Vercel account or team ID |
| `VERCEL_PROJECT_ID` | Vercel project ID for the frontend |
| `RENDER_DEPLOY_HOOK_URL` | Render deploy hook URL for the backend |

---

## Verifying the Deployment

### 1. Check the backend health endpoint

```bash
curl https://petgearhub-backend.onrender.com/health
```

Expected response:
```json
{"status":"ok"}
```

If you get a 502 or connection refused, the Render service may still be spinning up (free tier sleeps after 15 minutes of inactivity — see Free Tier Limits below). Wait 30 seconds and retry.

### 2. Open the frontend

Visit your Vercel URL in a browser:
```
https://petgearhub.vercel.app
```

The homepage should load without console errors. Open browser DevTools → Network and confirm API calls to `petgearhub-backend.onrender.com` return 200.

### 3. Test adding a product

1. Navigate to the admin section or use the API directly:
   ```bash
   curl -X POST https://petgearhub-backend.onrender.com/api/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Product","price":29.99}'
   ```
2. Confirm the product appears in the frontend product listing.

### 4. Verify CI/CD is wired up

1. Make a trivial change (e.g., update a comment in `frontend/src/app/page.tsx`).
2. Commit and push to `main`.
3. Go to GitHub → **Actions** tab.
4. You should see both the **CI** workflow and the **Deploy** workflow running. Both should complete green within 5 minutes.

---

## Free Tier Limits

Be aware of the following constraints on the free tiers used:

| Service | Limit | Impact |
|---------|-------|--------|
| **Render** | Web services sleep after **15 minutes** of inactivity | The first request after sleep takes 20–30 seconds to respond (cold start). This is normal for dev/staging. |
| **Render** | **750 compute hours/month** across all free services | Sufficient for one always-on service as long as no other free services are running simultaneously. |
| **Neon** | **0.5 GB** storage on the free plan | More than enough for development and early production traffic. |
| **Neon** | **191.9 compute hours/month** | Neon scales to zero automatically; compute hours are consumed only when queries are running. |
| **Vercel** | **100 GB bandwidth/month** | Generous for most hobby and early-stage projects. |
| **Vercel** | **6,000 build minutes/month** | Each deploy uses roughly 1–2 minutes. |

To avoid hitting Render's sleep behavior in production, consider pinging the health endpoint every 14 minutes using a free cron service such as [cron-job.org](https://cron-job.org).
