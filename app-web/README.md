# Go Reserve

A comprehensive room reservation system built with TanStack Start, Prisma, and PostgreSQL.

## Features

- **Authentication**: Secure login system for users and administrators.
- **Dashboard**: specialized dashboards for Admin and Student views.
- **Room Management**: Tools for admins to create, update, and manage room listings.
- **Reservations**: Booking interface for students and reservation management for admins.
- **User Management**: Administrative control over user accounts.
- **Landing Pages**: Public-facing pages including Home, About, Services, and Contact.

## Tech Stack

- **Framework**: TanStack Start
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4, Shadcn UI, and Framer Motion
- **State Management**: TanStack Query
- **Testing**: Vitest and React Testing Library
- **Tooling**: Biome (Linting/Formatting), Husky (Git hooks)

## Getting Started

### Prerequisites

- Node.js
- Bun (for running database scripts)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Xfhreall/go-reserve.git
   cd go-reserve
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Environment Setup:
   Copy the example environment file and configure your database connection.
   ```bash
   cp .env.example .env
   ```

4. Database Setup:
   Push the schema to your database and seed it with initial data.
   ```bash
   bun run db:push
   bun run db:seed
   ```

### Running the Application

Start the development server:

```bash
bun dev
```

The application will be accessible at `http://localhost:3000`.

## Available Scripts

- `bun dev`: Starts the development server.
- `bun run build`: Builds the application for production.
- `bun run preview`: Previews the production build.
- `bun run test`: Runs the test suite with Vitest.
- `bun run lint`: Lints the codebase using Biome.
- `bun run format`: Formats the code using Biome.
- `bun run check`: Checks code formatting and linting.
- `bun run db:generate`: Generates the Prisma client.
- `bun run db:push`: Pushes the Prisma schema to the database.
- `bun run db:seed`: Seeds the database with initial data.
