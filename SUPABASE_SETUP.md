# Supabase Setup Guide

## Problem
The application is currently getting a `net::ERR_NAME_NOT_RESOLVED` error when trying to connect to Supabase. This means the Supabase API endpoint in your `.env` file is either:
1. No longer valid (project deleted)
2. Using outdated credentials
3. Experiencing network issues

## Solution: Create a New Supabase Project

### Step 1: Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create a new account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: `ecommerce-website` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the region closest to your users
5. Click "Create New Project" and wait for it to initialize

### Step 2: Get Your API Credentials
1. Once your project is created, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (This is your `VITE_SUPABASE_URL`)
   - **anon public key** (This is your `VITE_SUPABASE_ANON_KEY`)

### Step 3: Update Your Environment Variables
1. Open `frontend/.env`
2. Update the following variables with your new credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Create Database Tables
You need to create the following tables in your Supabase database. Go to **SQL Editor** and run these queries:

#### UsersTable
```sql
CREATE TABLE UsersTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT NOT NULL,
  customerId TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### ProductsTable
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

#### CartTable
```sql
CREATE TABLE CartTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES UsersTable(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### CartItemsTable
```sql
CREATE TABLE CartItemsTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES CartTable(id) ON DELETE CASCADE,
  product_id SERIAL NOT NULL REFERENCES ProductsTable(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### OrdersTable
```sql
CREATE TABLE OrdersTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES UsersTable(id) ON DELETE CASCADE,
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

#### AddressesTable
```sql
CREATE TABLE AddressesTable (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES UsersTable(id) ON DELETE CASCADE,
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state_province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Step 5: Set Up Row Level Security (RLS)
1. Go to **Authentication** → **Policies** in Supabase
2. For each table, enable RLS and create policies that allow authenticated users to:
   - Read their own data
   - Create their own data
   - Update/Delete their own data

Example policy for UsersTable:
```sql
CREATE POLICY "Users can read their own data" 
ON UsersTable FOR SELECT 
USING (clerk_user_id = current_user_id());
```

### Step 6: Test the Connection
1. Save your changes to `.env`
2. Restart your development server: `npm run dev`
3. The app should now connect to Supabase without errors

## Troubleshooting

### Still Getting DNS Errors?
- Check that your Supabase URL is correct (no typos)
- Make sure your internet connection is working
- Try clearing your browser cache and restarting the dev server

### "Supabase is not configured" Warning
- This warning is intentional and means your credentials are missing or invalid
- Follow the steps above to set up valid credentials

### Permission Denied Errors
- Make sure Row Level Security (RLS) policies are properly configured
- Verify that your anon key has the correct permissions

## For Production
When deploying to production:
1. Create a new Supabase project (don't reuse development credentials)
2. Set up environment variables in your hosting platform (Vercel, Railway, etc.)
3. Configure CORS in Supabase Settings to allow your production domain
4. Implement additional security policies as needed
