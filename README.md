# 🛍️ Modique — Full-Stack E-Commerce Platform

A **production-ready**, full-featured e-commerce web application showcasing modern full-stack development practices. Built with a **React + TypeScript + Vite** frontend, **Express.js** backend, and **Stripe** payment integration.

**Live Demo:** [modique.madebysachin.com](https://d2okbcupv7ankv.cloudfront.net/)  
**GitHub:** [SachinB0101/ecommerce-website](https://github.com/SachinB0101/ecommerce-website)

---

## ✨ Key Features

### 🏪 Core E-Commerce Features
- **Product Catalog** — Browse products with category filtering (Women, Men, Accessories, Home)
- **Shopping Cart** — Add/remove items with real-time updates and persistent storage
- **Order Management** — Place orders, view order history, and track purchases
- **Wishlist** — Save products for later (Coming soon)
- **Product Details** — Size and color selection with stock availability

### 🔐 Authentication & Security
- **User Authentication** — Clerk-powered secure sign-up, sign-in, and session management
- **Protected Routes** — Route-level authorization guards
- **User Data Sync** — Automatic synchronization of user data across the platform
- **Secure Payment Processing** — PCI-compliant Stripe integration

### 💳 Payment Integration
- **Card Management** — Save and manage multiple payment methods
- **Setup Intents** — Secure card setup using Stripe Setup Intents
- **One-Click Checkout** — Quick payments using saved cards
- **Off-Session Payments** — Future payments without customer interaction

### 📱 User Experience
- **Responsive Design** — Mobile-first, works seamlessly on all devices
- **Real-Time Updates** — Live cart updates using Supabase Realtime
- **Smooth Animations** — Framer Motion animations for polished interactions
- **Toast Notifications** — User feedback with Sonner toast library
- **Loading States** — Skeleton loaders and spinners for smooth transitions

### 🗄️ Data Management
- **Real-Time Database** — Supabase for real-time data synchronization
- **Redux State Management** — Centralized state for cart, orders, and UI
- **Server-Side Caching** — React Query for efficient API data fetching and caching
- **Persistent Storage** — Local storage fallback for guest carts

---

## 🧰 Tech Stack

### **Frontend Stack**
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **TypeScript** | Type Safety | 5.9.3 |
| **Vite** | Build Tool & Dev Server | 7.3.1 |
| **React Router v7** | Client-side Routing | 7.13.0 |
| **Redux Toolkit** | State Management | 2.11.2 |
| **React Redux** | Redux Integration | 9.2.0 |
| **TanStack React Query** | Server State Management | 5.90.21 |
| **Tailwind CSS** | Utility-First Styling | 3.4.19 |
| **Framer Motion** | Animation Library | 11.0.0 |
| **shadcn/ui + Radix UI** | Component Library | Latest |
| **Clerk** | Authentication | 5.60.1 |
| **Supabase JS** | Real-Time Database | 2.96.0 |
| **Stripe React** | Payment Processing | 5.6.1 |
| **Lucide React** | Icon Library | 0.564.0 |
| **Sonner** | Toast Notifications | 2.0.7 |

### **Backend Stack**
| Technology | Purpose | Version |
|------------|---------|---------|
| **Express.js** | Web Framework | 5.2.1 |
| **TypeScript** | Type Safety | 5.9.3 |
| **Node.js** | Runtime Environment | Latest |
| **Stripe SDK** | Payment Processing | 20.4.1 |
| **CORS** | Cross-Origin Requests | 2.8.6 |
| **Dotenv** | Environment Variables | 17.3.1 |
| **Nodemon** | Development Server | 3.1.14 |

### **Database & Backend Services**
| Service | Purpose | Features |
|---------|---------|----------|
| **Supabase** | PostgreSQL Database | Real-time subscriptions, Row-level Security, Auth |
| **Stripe** | Payment Processing | Payment Intents, Setup Intents, Customer Management |
| **Clerk** | User Authentication | JWT tokens, Session management, User metadata |

### **DevOps & Deployment**
| Tool | Purpose |
|------|---------|
| **GitHub Actions** | CI/CD Pipeline |
| **AWS S3** | Static Site Hosting |
| **AWS CloudFront** | CDN & Distribution |
| **Docker** | Containerization (Backend) |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                             │
│              (React + TypeScript App)                        │
└───────────────────┬─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
    ┌───────┐  ┌────────┐  ┌──────────┐
    │ Clerk │  │Supabase│  │  Stripe  │
    │ Auth  │  │  DB    │  │ Payments │
    └───────┘  └────────┘  └──────────┘
        │           │           │
        └───────────┼───────────┘
                    │
        ┌───────────▼───────────┐
        │  Express Backend      │
        │  (Node.js + TypeScript)│
        │  - Stripe Integration │
        │  - CORS Middleware    │
        │  - Payment Processing │
        └───────────────────────┘
```

---

## 📁 Project Structure

```
ecommerce-website/
├── frontend/                           # React Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── hooks/                 # Custom React hooks
│   │   │   │   ├── address/           # Address management hooks
│   │   │   │   ├── cart/              # Cart operations (get, add, update, delete)
│   │   │   │   ├── orders/            # Order fetching and saving
│   │   │   │   ├── payment/           # Payment setup and checkout
│   │   │   │   ├── products/          # Product fetching with filtering
│   │   │   │   ├── useLocalStorage.ts # Local storage utilities
│   │   │   │   ├── useRedux.ts        # Redux hooks
│   │   │   │   └── useUserDataSync.ts # User data synchronization
│   │   │   └── store/
│   │   │       ├── store.ts           # Redux store configuration
│   │   │       └── cartListener.ts    # Cart middleware
│   │   ├── components/
│   │   │   ├── auth/                  # Protected routes & auth sync
│   │   │   ├── cart/                  # Shopping cart UI
│   │   │   ├── checkout/              # Checkout flow
│   │   │   ├── products/              # Product display components
│   │   │   ├── layout/                # Header & Footer
│   │   │   ├── profile/               # User profile & settings
│   │   │   └── ui/                    # shadcn/ui components
│   │   ├── features/
│   │   │   ├── cart/                  # Redux slice for cart state
│   │   │   └── order/                 # Redux slice for order state
│   │   ├── lib/
│   │   │   ├── cartService.ts         # Cart API operations
│   │   │   ├── orderService.ts        # Order API operations
│   │   │   ├── stripe.ts              # Stripe utilities
│   │   │   ├── mockData.ts            # Mock data for development
│   │   │   └── utils.ts               # Utility functions
│   │   ├── pages/                      # Page components
│   │   ├── types/                      # TypeScript interfaces
│   │   ├── App.tsx                    # Main app component
│   │   └── main.tsx                   # Entry point
│   ├── vite.config.ts                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS config
│   ├── tsconfig.json                  # TypeScript config
│   ├── .env                           # Environment variables (local)
│   └── package.json
│
├── backend/                            # Express Backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── payments.ts            # Payment API endpoints
│   │   │       ├── POST /create-customer      # Create Stripe customer
│   │   │       ├── POST /setup-intent        # Setup card for payment
│   │   │       ├── GET  /saved-cards         # Fetch saved payment methods
│   │   │       ├── POST /checkout            # Process payment
│   │   │       └── DELETE /card              # Remove saved card
│   │   └── index.ts                   # Express app setup & CORS config
│   ├── tsconfig.json                  # TypeScript config
│   ├── .env                           # Environment variables
│   └── package.json
│
├── README.md                          # This file
├── SUPABASE_SETUP.md                  # Supabase configuration guide
├── FIX_SUMMARY.md                     # Known fixes and troubleshooting
└── .gitignore
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 16+ and **npm** (or yarn)
- **Git**
- Accounts for: **Clerk**, **Stripe**, **Supabase**

### Step 1: Clone the Repository
```bash
git clone https://github.com/SachinB0101/ecommerce-website.git
cd ecommerce-website
```

### Step 2: Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your credentials:
# - VITE_CLERK_PUBLISHABLE_KEY
# - VITE_STRIPE_PUBLIC_KEY
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - VITE_SERVER_API_URL=http://localhost:8080

npm run dev
# Frontend runs at http://localhost:5173
```

### Step 3: Backend Setup
```bash
cd ../backend

# Install dependencies
npm install

# Create environment file
touch .env
# Add environment variables:
# - STRIPE_SECRET_KEY=sk_test_...
# - PORT=8080
# - FRONTEND_URL=http://localhost:5173

npm run dev
# Backend runs at http://localhost:8080
```

### Step 4: Database Setup
Follow the **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** guide to:
1. Create a Supabase project
2. Set up PostgreSQL tables
3. Configure Row-Level Security (RLS) policies

---

## 🎯 Running the Application

### Development Mode
```bash
# Terminal 1: Frontend
cd frontend
npm run dev

# Terminal 2: Backend
cd backend
npm run dev

# Open http://localhost:5173 in your browser
```

### Production Build
```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend
cd backend
npm run build
npm start
```

---

## 📡 API Documentation

### Payment Endpoints (Backend: http://localhost:8080)

#### 1. Create Stripe Customer
```http
POST /api/payments/create-customer
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}

Response: { "customerId": "cus_xxx" }
```

#### 2. Setup Card (Create Setup Intent)
```http
POST /api/payments/setup-intent
Content-Type: application/json

{
  "customerId": "cus_xxx"
}

Response: { "clientSecret": "seti_xxx_secret_xxx" }
```

#### 3. Get Saved Cards
```http
GET /api/payments/saved-cards?customerId=cus_xxx

Response: {
  "paymentMethods": [
    {
      "id": "pm_xxx",
      "card": {
        "brand": "visa",
        "last4": "4242",
        "exp_month": 12,
        "exp_year": 2025
      }
    }
  ]
}
```

#### 4. Process Payment (Checkout)
```http
POST /api/payments/checkout
Content-Type: application/json

{
  "customerId": "cus_xxx",
  "items": [...],
  "email": "user@example.com",
  "currency": "cad"
}

Response: {
  "success": true,
  "paymentIntentId": "pi_xxx"
}
```

#### 5. Delete Payment Method
```http
DELETE /api/payments/card
Content-Type: application/json

{
  "customerId": "cus_xxx",
  "paymentMethodId": "pm_xxx"
}

Response: { "wasLastCard": false }
```

---

## 🗄️ Database Schema

### UsersTable
```sql
CREATE TABLE UsersTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  customerId TEXT,                    -- Stripe customer ID
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### ProductsTable
```sql
CREATE TABLE ProductsTable (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  inStock BOOLEAN DEFAULT true,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews TEXT[] DEFAULT '{}',
  brand TEXT,
  material TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### CartTable & CartItemsTable
```sql
CREATE TABLE CartTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES UsersTable(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE CartItemsTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES CartTable(id),
  product_id SERIAL NOT NULL REFERENCES ProductsTable(id),
  quantity INT NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### OrdersTable
```sql
CREATE TABLE OrdersTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES UsersTable(id),
  email TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  address JSONB NOT NULL,
  payment_method_last4 TEXT,
  payment_method_brand TEXT,
  payment_intent_id TEXT NOT NULL UNIQUE,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  estimated_delivery DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔑 Key Implementation Details

### State Management
- **Redux Toolkit** for global cart and order state
- **React Query** for server state and API caching
- **Custom Hooks** for feature-specific logic (address, payments, orders)
- **Redux Middleware** for cart persistence to Supabase

### Real-Time Features
- **Supabase Realtime** for live cart updates across tabs
- **React Query** automatic refetching on window focus
- **Optimistic Updates** for immediate UI feedback

### Performance Optimizations
- **Lazy Loading** of components using React.lazy()
- **Code Splitting** with Vite for smaller bundle size
- **Image Optimization** with Tailwind CSS
- **Query Caching** with React Query

### Security Best Practices
- **Environment Variables** for sensitive data
- **TypeScript** for type safety across the application
- **CORS Configuration** to restrict API access
- **Stripe PCI Compliance** for secure payment handling
- **Clerk Authentication** with JWT tokens

### Error Handling
- **Try-Catch Blocks** in async operations
- **Error Boundaries** in React (if needed)
- **User-Friendly Error Messages** with toast notifications
- **Fallback to Mock Data** when services are unavailable

---

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (`#4F46E5`)
- **Secondary**: Gray (`#6B7280`)
- **Accent**: Emerald (`#10B981`)
- **Danger**: Red (`#EF4444`)

### Typography
- **Headings**: Display font (fallback to system sans-serif)
- **Body**: System sans-serif stack
- **Monospace**: For code blocks

### Components
All UI components use **shadcn/ui** with **Radix UI** primitives:
- Buttons, Cards, Inputs
- Dialogs, Dropdowns, Sheets
- Labels, Badges, Skeletons

---

## 🚀 Deployment

### Frontend Deployment (AWS S3 + CloudFront)
```bash
npm run build
# Upload dist/ folder to S3 bucket
# Invalidate CloudFront distribution
```

### Backend Deployment (Docker + Railway/Heroku)
```bash
# Build Docker image
docker build -t ecommerce-backend .

# Push to container registry
docker push yourusername/ecommerce-backend

# Deploy to Railway/Heroku
```

### CI/CD Pipeline (GitHub Actions)
- **Frontend**: Automatic deployment on push to `main`
- **Backend**: Docker image build and push
- **Automated Tests**: Run before deployment

---

## 🔮 Future Enhancements

- [ ] **Search & Filtering** — Advanced product search with facets
- [ ] **Reviews & Ratings** — User-generated product reviews
- [ ] **Wishlist** — Save products for later
- [ ] **Admin Dashboard** — Inventory and order management
- [ ] **Email Notifications** — Order status updates
- [ ] **Mobile App** — React Native version
- [ ] **Analytics** — User behavior tracking
- [ ] **Multi-Currency Support** — Support for multiple currencies
- [ ] **Inventory Management** — Real-time stock tracking

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure `VITE_SERVER_API_URL` is correctly set to `http://localhost:8080`
- Check backend CORS configuration allows your frontend origin
- See [CORS Fix Documentation](./CORS_FIX.md)

### Supabase Connection Issues
- Verify credentials in `.env` file
- Check Supabase project is active
- Ensure tables are created (see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))

### Stripe Payment Failures
- Use Stripe test card: `4242 4242 4242 4242`
- Check Stripe API keys are correct
- Verify webhook signatures (if applicable)

For more details, see [FIX_SUMMARY.md](./FIX_SUMMARY.md)

---

## 📚 Documentation

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** — Database configuration guide
- **[FIX_SUMMARY.md](./FIX_SUMMARY.md)** — Known issues and solutions
- **[API Documentation](#-api-documentation)** — Endpoint specifications

---


## 👨‍💻 Author

**Sachin B**
- 🌐 Website: [madebysachin.com](https://d2som4l1lbhsiq.cloudfront.net/)
- 📧 Email: [contact@madebysachin.com](mailto:sachin.bhatt0010@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/sachinb](https://www.linkedin.com/in/sachin-bhatt-5333b7217/)
- 🐙 GitHub: [@SachinB0101](https://github.com/SachinB0101)

---

**Last Updated:** May 2026  
**Status:** Active Development  
**Version:** 1.0.0
│   │   ├── home/             # Hero, featured section, categories
│   │   ├── layout/           # Header and Footer
│   │   ├── loading/          # Initializing screen
│   │   ├── navbar/           # Navbar
│   │   ├── products/         # ProductCard and product grid
│   │   └── ui/               # shadcn/ui primitives (button, card, sheet, etc.)
│   ├── data/                 # Static product data
│   ├── features/
│   │   └── cart/             # Cart Redux slice
│   ├── lib/                  # Supabase client, localStorage helpers, utilities
│   ├── pages/                # Route-level page components
│   ├── types/                # TypeScript type definitions
│   ├── supabaseClient.ts     # Supabase client initialization
│   └── main.tsx
├── seedProducts.ts            # Script to seed Supabase with products
├── .env.local
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) account and project
- A [Clerk](https://clerk.com/) account and application

---

### 1. Clone the Repository

```bash
git clone https://github.com/SachinB0101/ecommerce-website.git
cd ecommerce-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project:

```env
# Clerk
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in:

- **Clerk:** Dashboard → Your App → API Keys
- **Supabase:** Project Settings → API

### 4. Set Up the Database

Run the following SQL in your Supabase project to create the required tables:

```sql
-- Users
create table public."UsersTable" (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  clerk_user_id text not null unique,
  first_name character varying not null,
  last_name character varying,
  email character varying unique,
  "imageUrl" character varying,
  constraint UsersTable_pkey primary key (id)
);

-- Products
create table public."ProductsTable" (
  id bigint generated by default as identity not null,
  created_at timestamp with time zone not null default now(),
  name character varying,
  description character varying,
  price numeric,
  category character varying,
  image character varying,
  images json,
  "inStock" boolean,
  rating numeric,
  reviews numeric,
  sizes json,
  colors json,
  brand character varying,
  material character varying,
  constraint ProductsTable_pkey primary key (id)
);

-- Carts
create table public."CartTable" (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone default now(),
  user_id uuid not null references "UsersTable"(id),
  constraint CartTable_pkey primary key (id)
);

-- Cart Items
create table public."CartItemsTable" (
  id uuid not null default gen_random_uuid(),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone default now(),
  cart_id uuid references "CartTable"(id),
  product_id bigint references "ProductsTable"(id),
  quantity numeric not null,
  size character varying,
  color character varying,
  constraint CartItemsTable_pkey primary key (id)
);
```

> **Recommended:** Enable Row Level Security (RLS) on all tables and add appropriate policies to protect user data.

Then optionally seed product data:

```bash
npm run seed
```

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📦 Available Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the local development server           |
| `npm run build`   | Type-check and build for production          |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint across the project                |
| `npm run seed`    | Seed the Supabase database with product data |

---

## ☁️ Deployment

The app is deployed as a **static site on AWS S3** and served via S3's static website hosting.

Deployments are automated via **GitHub Actions**. On every push to the `main` branch, the workflow:

1. Installs dependencies
2. Injects environment secrets for the build
3. Runs the production build (`npm run build`)
4. Syncs the `dist/` output to the S3 bucket

To configure your own deployment, add the following secrets to your GitHub repository:

```
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
VITE_CLERK_PUBLISHABLE_KEY
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

> **Note:** The Vite environment variables must be passed as secrets during the build step, as they are statically inlined at build time.

---

## 🔐 Authentication Flow

Authentication is handled entirely by [Clerk](https://clerk.com/). The `<ClerkProvider>` wraps the app at the root level, giving access to user sessions and auth state throughout. A `SyncUserData` component keeps the Supabase `UsersTable` in sync with Clerk on sign-in, and `ProtectedRoute` guards any routes that require an active session.

---

## 🗄️ Database Schema

[Supabase](https://supabase.com/) is used as the backend database via the client-side JS SDK. The schema consists of four tables:

- **UsersTable** — Stores user profiles synced from Clerk, keyed on `clerk_user_id`
- **ProductsTable** — Product catalog with pricing, inventory, images, sizes, colors, and metadata
- **CartTable** — One cart per user, linked to `UsersTable`
- **CartItemsTable** — Individual line items in a cart, with quantity, size, and color

Data fetching is cached and managed using **TanStack React Query**, reducing redundant network requests and keeping the UI snappy.
