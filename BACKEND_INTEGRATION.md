# Supabase Backend Integration

This document outlines how to set up and integrate Supabase with the Rare Parfume website.

## Setup Instructions

### 1. Create a Supabase Project

1. Log in to [Supabase](https://supabase.com)
2. Create a new organization (if needed)
3. Create a new project with the following settings:
   - Name: `my_dev_db` (or your preferred name)
   - Region: `ap-southeast-1` (or your preferred region)
   - Database Password: (use a strong password)

### 2. Configure Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```
   cp .env.example .env.local
   ```

2. Update the `.env.local` file with your Supabase project details:
   ```
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key
   ```

   You can find these values in the Supabase dashboard under Project Settings > API.

### 3. Apply Database Migrations

1. Install the Supabase CLI:
   ```
   npm install -g supabase
   ```

2. Link your project:
   ```
   supabase link --project-ref your-project-ref
   ```

3. Apply migrations:
   ```
   supabase db push
   ```

## Database Schema

The database includes the following tables:

1. **products** - Store product information
   - id (PK)
   - name
   - description
   - price
   - image_url
   - category
   - in_stock
   - created_at
   - updated_at

2. **orders** - Store order information
   - id (PK)
   - user_id (FK to auth.users)
   - status
   - total_amount
   - shipping_address
   - payment_intent_id
   - created_at
   - updated_at

3. **order_items** - Store order line items
   - id (PK)
   - order_id (FK to orders)
   - product_id (FK to products)
   - quantity
   - price
   - created_at

4. **user_profiles** - Store additional user information
   - id (PK, FK to auth.users)
   - full_name
   - phone
   - address
   - created_at
   - updated_at

## Authentication

Authentication is handled by Supabase Auth. The following features are available:

- Email/password sign up and sign in
- Social login (can be enabled in the Supabase dashboard)
- Password reset
- Email verification

## Row Level Security (RLS)

Row Level Security is enabled on all tables to ensure data security:

- Products are viewable by everyone
- Orders are only viewable by the user who created them
- Order items are only viewable by the user who owns the order
- User profiles are only viewable by the user who owns the profile

## API Integration

The application uses the Supabase JavaScript client to interact with the backend:

- Authentication: `supabase.auth.*`
- Database: `supabase.from('table_name').*`

See `src/services/supabaseService.ts` for implementation details.

## Development Workflow

1. Make changes to the database schema in `supabase/migrations/`
2. Apply migrations using the Supabase CLI
3. Update TypeScript types if needed
4. Update the frontend to use the new schema

## Troubleshooting

- If you encounter CORS issues, make sure your site's URL is added to the allowed origins in the Supabase dashboard under Project Settings > API > CORS Configuration.
- For authentication issues, check the Auth settings in the Supabase dashboard.
- For database errors, check the SQL logs in the Supabase dashboard.