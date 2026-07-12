# 🛍️ Modique — Local Full-Stack E-Commerce Demo

A local development demo of an e-commerce platform with a **React + TypeScript + Vite** frontend and an **Express + TypeScript** backend.

This project is designed to run locally on your machine, so you can demo it without production deployment.

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

> Important: `VITE_SUPABASE_URL` should be the Supabase project domain only (no `/rest/v1/`).

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

## Notes for local development

- The app is meant for **local dev only**.
- Use Stripe **test keys**: `pk_test_...` in frontend and `sk_test_...` in backend.
- Supabase URL must not include `/rest/v1/`.
- Keep `frontend/.env` and `backend/.env` private.
- The app now runs locally without requiring production deployment.

## Project structure

- `frontend/` — React application and client-side logic
- `backend/` — Express API for payment routes
- `frontend/.env` — local frontend settings
- `backend/.env` — local backend settings

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

