# Quick Start Guide

This guide will help you get started with the Rare Parfume website project.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Supabase account

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd rare-parfume-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file and update it with your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase project URL and anonymous key:

```
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in your Supabase dashboard under Project Settings > API.

### 4. Start the development server

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Features

- **Authentication**: Sign up, sign in, and profile management
- **Product Catalog**: Browse and search for products
- **Shopping Cart**: Add products to cart and manage quantities
- **Checkout Process**: Complete purchases with shipping and payment information
- **Order History**: View past orders and their status

## Project Structure

- `src/components/`: Reusable UI components
- `src/context/`: React context providers
- `src/pages/`: Page components
- `src/services/`: API and service functions
- `src/utils/`: Utility functions
- `src/types/`: TypeScript type definitions

## Supabase Integration

This project uses Supabase for:

1. **Authentication**: User sign-up, sign-in, and management
2. **Database**: Storing products, orders, and user profiles
3. **Storage**: Storing product images (optional)

For detailed information on the Supabase setup, see [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md).

## Available Scripts

- `npm start`: Start the development server
- `npm test`: Run tests
- `npm run build`: Build for production
- `npm run eject`: Eject from Create React App

## Next Steps

1. Set up your Supabase project following the instructions in [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)
2. Customize the UI to match your brand
3. Add real product data
4. Configure payment processing
5. Deploy to your hosting provider