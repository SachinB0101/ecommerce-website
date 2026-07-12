# 🛍️ Modique — Local Full-Stack E-Commerce Demo

A local development demo of an e-commerce platform with a **React + TypeScript + Vite** frontend and an **Express + TypeScript** backend.

This project is designed to run locally on your machine and is not configured for production deployment.

## What this app includes

- Product catalog with category browsing
- Shopping cart and checkout flow
- Clerk authentication and protected routes
- Stripe payment setup and saved cards
- Supabase-backed user/cart data
- Redux Toolkit + React Query for state management
- Tailwind-based responsive UI with framer motion animations

## Tech stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Clerk, Stripe, Supabase
- Backend: Express, TypeScript, Stripe, dotenv
- Data: Supabase (PostgreSQL + real-time)

## Local setup

### 1. Clone the repo

```bash
git clone https://github.com/SachinB0101/ecommerce-website.git
cd ecommerce-website
```

### 2. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env` with:

```env
VITE_SUPABASE_URL=https://<your-supabase-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
VITE_STRIPE_PUBLIC_KEY=<your-stripe-publishable-key>
VITE_SERVER_API_URL=http://localhost:8080
```

> Important: `VITE_SUPABASE_URL` must be the Supabase project domain only (no `/rest/v1/`).

Start the frontend:

```bash
npm run dev
```

Open the app at:

```bash
http://localhost:5173
```

### 3. Backend setup

```bash
cd ../backend
npm install
```

Create `backend/.env` with:

```env
STRIPE_SECRET_KEY=<your-stripe-secret-key>
PORT=8080
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend API is available at:

```bash
http://localhost:8080
```

## Docker setup

Run the full app locally with Docker.

```bash
docker compose up --build
```

This starts:
- Frontend at `http://localhost:4173`
- Backend at `http://localhost:8080`

If port `8080` is already in use, stop the local backend process before starting Docker, or change the backend port mapping in `docker-compose.yml`.

When finished:

```bash
docker compose down
```

## Notes for local development

- The app is intended for **local development only**.
- Use Stripe **test keys**: `pk_test_...` in frontend and `sk_test_...` in backend.
- Keep `frontend/.env` and `backend/.env` private.
- The backend CORS config currently allows requests from `http://localhost:5173` and `http://localhost:4173`.
- `VITE_SERVER_API_URL` should point to the backend URL used by the browser, typically `http://localhost:8080`.

## Project structure

- `frontend/` — React application and client-side code
- `backend/` — Express API for payment routes
- `frontend/.env` — frontend configuration
- `backend/.env` — backend configuration
- `docker-compose.yml` — local Docker service configuration

## Quick start

In one terminal:

```bash
cd backend
npm run dev
```

In another terminal:

```bash
cd frontend
npm run dev
```

Then visit:

```bash
http://localhost:5173
```
