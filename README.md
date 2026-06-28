# Budget Tracker on Next.js

A TypeScript budget tracker built with Next.js, Prisma, PostgreSQL, and NextAuth.

Users can sign up, sign in with credentials or Google, track income and expenses, and review transaction history in a clean dashboard UI.

## Features

- Email / username sign-up with secure password hashing
- Credential login and Google SSO via NextAuth
- Add income and expense transactions with category, date, and note
- Display current balance and transaction history
- Delete transactions from history
- Category support for common income and expense types
- User session management with protected API routes

## Tech stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth
- Material UI
- Day.js
- Tailwind CSS / PostCSS support

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file with at least the following:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are required only if you want Google login.

### 3. Initialize Prisma

Generate the Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

If you already have an existing database and want to push schema changes without generating a new migration, use:

```bash
npx prisma db push
```

### 4. Run the app

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Usage

- Visit `/signup` to create a new account
- Visit `/login` to sign in with email/username and password or Google
- After login, access the dashboard to add and manage transactions
- The dashboard shows your current balance and recent history

## Database schema

The app stores:

- `User` with username, email, password, transactions, and categories
- `Transaction` with amount, type, category, note, and timestamp
- `Category` to classify user transactions

Predefined categories are created automatically for new users during registration.

## Scripts

- `npm run dev` — start local development server
- `npm run build` — build production bundle
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Notes

- The `app/api/register/route.ts` endpoint registers new users and seeds default categories
- The `app/api/transactions/route.ts` endpoint supports listing, creating, and deleting transactions
- The settings UI is present in the app, and account update behavior may require the corresponding API route to be implemented

## Project structure

- `app/` — Next.js app routes and pages
- `components/` — reusable UI components
- `lib/` — Prisma client and auth helpers
- `prisma/` — database schema and migrations
- `scripts/` — utility scripts

## License

This project is released under the [MIT License](LICENSE) if applicable.
