# Personal Book Manager

A deceptively simple space for readers to log their books, reflect on their habits, and rediscover their favorite authors.

## Features

- **JWT Authentication**: Secure signup, login, and logout with HttpOnly cookies.
- **Book Collection**: Add books (title, author, tags, status), edit, or delete them.
- **Filtering**: Quickly find books by tag or reading status.
- **Statuses**: "Want to Read", "Reading", "Completed".
- **Dashboard Insights**: Clean metrics showing total books, reading books, and completed books.
- **Elegant UI**: Beautiful by default, using Tailwind CSS and Next.js App Router for a clean, minimal design.

## Technology Used

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js)
- **Database**: MongoDB & Mongoose
- **Auth**: JWT (jsonwebtoken), bcryptjs

## Local Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup environment variables**:
   Rename `.env.example` to `.env.local` and add your MongoDB connection string and a random string for `JWT_SECRET`.
   ```bash
   cp .env.example .env.local
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **Open browser** and visit `http://localhost:3000`.

