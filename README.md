# Curated — Premium Affiliate Product Website

A full-stack affiliate product website with an Apple-inspired editorial design and a powerful admin automation system. Admin pastes an affiliate link, the system auto-extracts product details via official APIs, and publishes beautifully designed product pages.

## Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Next.js App    │────▶│   NestJS API     │────▶│   PostgreSQL     │
│   (Vercel)       │     │   (AWS ECS)      │     │   (AWS RDS)      │
│                  │     │                  │     │                  │
│  • Public Site   │     │  • Auth (JWT)    │     │  • Products      │
│  • Admin Panel   │     │  • CRUD APIs     │     │  • Categories    │
│  • SSR/SSG       │     │  • Extraction    │     │  • Analytics     │
│                  │     │  • Analytics     │     │  • Users         │
└──────────────────┘     └──────────────────┘     └──────────────────┘
                                │
                      ┌─────────┴─────────┐
                      │  External APIs     │
                      │  • Amazon PA-API   │
                      │  • eBay Browse API │
                      └───────────────────┘
```

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 14, React 18, TypeScript    |
| Styling    | TailwindCSS, Framer Motion          |
| Backend    | NestJS 10, Prisma ORM               |
| Database   | PostgreSQL 16                       |
| Auth       | JWT (Passport.js)                   |
| Extraction | Amazon PA-API, eBay Browse API      |
| Hosting    | Vercel (frontend) + AWS (backend)   |

## Design System

| Token          | Value                                 |
|----------------|---------------------------------------|
| Palette        | Luxury Heritage — #111, #FAFAFA, Gold #C9A227 |
| Heading Font   | Playfair Display (serif)              |
| Body Font      | DM Sans (sans-serif)                  |
| Grid           | 8px spacing system                    |
| Animations     | Framer Motion, 200–500ms, ease-in-out |

---

## Quick Start (Local Development)

### Prerequisites

- Node.js 20+
- Docker & Docker Compose (for PostgreSQL)
- npm or yarn

### 1. Clone and install

```bash
cd affiliate-site

# Install backend dependencies
cd backend
cp .env.example .env
npm install

# Install frontend dependencies
cd ../frontend
cp .env.example .env
npm install
```

### 2. Start the database

```bash
cd affiliate-site
docker-compose up -d postgres
```

### 3. Run database migrations and seed

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

This creates:
- Default admin user: `admin@affiliate.com` / `admin123`
- 6 default categories

### 4. Start development servers

Terminal 1 — Backend:
```bash
cd backend
npm run start:dev
# API running at http://localhost:4000
# Swagger docs at http://localhost:4000/api/docs
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
# Site running at http://localhost:3000
```

### 5. Access the site

- **Public site:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin
- **API docs:** http://localhost:4000/api/docs

---

## Admin Workflow

1. Log in at `/admin` (default: admin@affiliate.com / admin123)
2. Click **Add Product**
3. Paste an Amazon or eBay product URL
4. Click **Extract Product Data** — system fetches via official APIs
5. Review and edit the extracted data
6. Set category, add pros/cons, write editorial summary
7. Click **Publish Now** or **Save as Draft**
8. Product appears on the public site

---

## Configuring Affiliate APIs

### Amazon Product Advertising API

1. Sign up at [Amazon Associates](https://affiliate-program.amazon.com)
2. Register for [PA-API 5.0](https://webservices.amazon.com/paapi5/documentation)
3. Add to `backend/.env`:
   ```
   AMAZON_ACCESS_KEY=your-access-key
   AMAZON_SECRET_KEY=your-secret-key
   AMAZON_PARTNER_TAG=your-tag-20
   ```

### eBay Browse API

1. Register at [eBay Developer Program](https://developer.ebay.com)
2. Create an application to get your App ID
3. Add to `backend/.env`:
   ```
   EBAY_APP_ID=your-app-id
   ```

> Without API keys, the extraction returns placeholder data — you can still add products manually.

---

## API Endpoints

| Method | Endpoint               | Auth | Description               |
|--------|------------------------|------|---------------------------|
| POST   | /api/auth/login        | No   | Admin login → JWT token   |
| POST   | /api/auth/register     | No   | Register admin/editor     |
| GET    | /api/products          | No   | List products (paginated) |
| GET    | /api/products/featured | No   | Get featured products     |
| GET    | /api/products/latest   | No   | Get latest products       |
| GET    | /api/products/:slug    | No   | Get product by slug       |
| POST   | /api/products          | Yes  | Create product            |
| PUT    | /api/products/:id      | Yes  | Update product            |
| DELETE | /api/products/:id      | Yes  | Delete product            |
| GET    | /api/products/stats    | Yes  | Dashboard stats           |
| POST   | /api/extract           | Yes  | Extract from URL          |
| GET    | /api/categories        | No   | List categories           |
| GET    | /api/categories/:slug  | No   | Category with products    |
| POST   | /api/categories        | Yes  | Create category           |
| DELETE | /api/categories/:id    | Yes  | Delete category           |
| POST   | /api/analytics/view/:id| No   | Track product view        |
| POST   | /api/analytics/click/:id| No  | Track affiliate click     |
| GET    | /api/analytics/dashboard| Yes | Analytics overview        |

---

## Deployment

### Frontend → Vercel

```bash
cd frontend
vercel deploy --prod
```

Set environment variable: `NEXT_PUBLIC_API_URL=https://your-api-domain.com/api`

### Backend → AWS ECS

1. Build Docker image:
   ```bash
   cd backend
   docker build -t affiliate-backend .
   ```

2. Push to ECR and deploy to ECS with the required environment variables.

3. Set up RDS PostgreSQL and update `DATABASE_URL`.

### CI/CD

Add GitHub Actions workflow for:
- Run tests on PR
- Build Docker images on merge to main
- Deploy frontend to Vercel automatically
- Deploy backend to AWS ECS via ECR

---

## Project Structure

```
affiliate-site/
├── docker-compose.yml          # Local PostgreSQL
├── README.md
│
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── main.ts            # Entry point + Swagger
│   │   ├── app.module.ts      # Root module
│   │   ├── auth/              # JWT authentication
│   │   ├── products/          # Product CRUD
│   │   ├── categories/        # Category management
│   │   ├── extraction/        # Amazon/eBay API clients
│   │   ├── analytics/         # View/click tracking
│   │   └── common/            # Prisma, guards, pipes
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Initial data
│   ├── Dockerfile
│   └── .env.example
│
└── frontend/                   # Next.js App
    ├── app/
    │   ├── (public)/           # Public pages
    │   │   ├── page.tsx        # Homepage
    │   │   ├── products/       # Product listing + detail
    │   │   └── categories/     # Category pages
    │   └── admin/              # Admin dashboard
    │       ├── page.tsx        # Dashboard
    │       ├── add/            # Add product workflow
    │       ├── products/       # Product management
    │       ├── categories/     # Category management
    │       ├── analytics/      # Analytics dashboard
    │       └── settings/       # Site settings
    ├── components/
    │   ├── ui/                 # ScrollReveal, shared components
    │   ├── public/             # Header, Footer, ProductCard
    │   └── admin/              # Admin-specific components
    ├── lib/
    │   ├── api.ts              # API client
    │   └── types.ts            # TypeScript types
    ├── styles/
    │   └── globals.css         # Tailwind + custom styles
    └── .env.example
```

---

## License

Private project. All rights reserved.
