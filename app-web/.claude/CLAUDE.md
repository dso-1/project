# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Go Reserve** is a room reservation system for the Faculty of Computer Science at Universitas Brawijaya. It provides separate interfaces for administrators (room management, reservation approval) and students (room browsing, reservation booking).

## Tech Stack

- **Framework**: TanStack Start (React 19 with SSR/SSG capabilities)
- **Language**: TypeScript (strict mode enabled)
- **Database**: PostgreSQL with Prisma ORM
- **API**: GraphQL (graphql-yoga)
- **Styling**: Tailwind CSS v4 + Shadcn UI components
- **State Management**: TanStack Query (React Query) for server state
- **Authentication**: Session-based with localStorage fallback
- **File Storage**: AWS S3 (R2 compatible)
- **Testing**: Vitest + React Testing Library
- **Code Quality**: Biome (linting/formatting), Husky (git hooks)
- **Package Manager**: Bun

## Project Structure

```
src/
├── api/                    # GraphQL schema and resolvers
├── features/               # Feature-based modules
│   ├── auth/              # Authentication (login, register, session)
│   ├── dashboard/         # Admin and student dashboards
│   ├── landing/           # Public pages (home, about, services, contact)
│   ├── reservations/      # Reservation management
│   └── rooms/             # Room management and browsing
├── routes/                # TanStack Router file-based routing
├── shared/
│   ├── components/        # Reusable UI components
│   │   └── ui/shadcn/    # Shadcn UI components
│   ├── lib/              # Utilities (Prisma, query client, session, R2)
│   └── styles/           # Global styles
└── router.tsx            # Router configuration
```

## Common Development Commands

```bash
# Development
bun dev                    # Start dev server on port 3000

# Building
bun run build             # Build for production
bun run preview           # Preview production build

# Code Quality
bun run lint              # Lint with Biome
bun run format            # Format code with Biome
bun run check             # Check formatting and linting

# Testing
bun run test              # Run tests with Vitest

# Database
bun run db:push           # Push Prisma schema to database
bun run db:generate       # Generate Prisma client
bun run db:seed           # Seed database with initial data
```

## Architecture Patterns

### File-Based Routing (TanStack Router)
Routes are defined in `src/routes/` using file-based conventions:
- `__root.tsx` - Root layout with providers (QueryClient, AuthProvider)
- `_authenticated.tsx` - Protected route layout
- `index.tsx` - Home page
- Nested folders create route segments

The router tree is auto-generated in `routeTree.gen.ts`.

### Feature-Based Organization
Each feature (auth, rooms, reservations, etc.) is self-contained with:
- `api/` - Server functions and API calls
- `components/` - Feature-specific React components
- `hooks/` - Feature-specific custom hooks

### Server Functions (TanStack Start)
Use `createServerFn()` for backend operations that run on the server:
- Authentication (login, register, validation)
- Database queries and mutations
- File uploads to R2

Example pattern in `src/features/auth/api/auth.server.ts`:
```typescript
export const loginFn = createServerFn({ method: 'POST' })
  .inputValidator((data) => data)
  .handler(async ({ data }) => {
    // Server-side logic
  });
```

### GraphQL API
The GraphQL endpoint is at `/api/graphql` with:
- **Queries**: Users, rooms, reservations, availability checks
- **Mutations**: Create/update/delete operations
- **Context**: User ID and role passed from session

Authorization is role-based (ADMIN vs MAHASISWA).

### Authentication Flow
1. User logs in via `loginFn` server function
2. User data stored in localStorage
3. `AuthProvider` validates user on app load via `validateUserFn`
4. `useAuth()` hook provides user context throughout app
5. Protected routes check `useIsAdmin()` or `useAuth().isAuthenticated`

### Database Schema
Three main models:
- **User**: email, password (hashed), name, nim (student ID), role (ADMIN/MAHASISWA)
- **Room**: name, capacity, facilities, image, description, location, status
- **Reservation**: user, room, startTime, endTime, status, purpose, notes

Indexes on userId, roomId, and time ranges for efficient queries.

## Key Files to Know

- `src/routes/__root.tsx` - Root layout with global providers
- `src/features/auth/api/auth.server.ts` - Authentication server functions
- `src/features/auth/hooks/use-auth.tsx` - Auth context and hooks
- `prisma/schema.prisma` - Database schema
- `vite.config.ts` - Build configuration with TanStack Start plugin
- `tsconfig.json` - Path aliases (@/, @/features/, @/lib/, etc.)

## Development Notes

### Path Aliases
Use configured aliases for cleaner imports:
- `@/*` → `src/*`
- `@/features/*` → `src/features/*`
- `@/lib/*` → `src/shared/lib/*`
- `@/shadcn/*` → `src/shared/components/ui/shadcn/*`

### Environment Variables
Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` - R2 credentials
- `AWS_REGION`, `AWS_BUCKET_NAME` - R2 bucket configuration

### Testing
Tests use Vitest with React Testing Library. Run with `bun run test`.

### Code Style
- Biome enforces formatting and linting
- TypeScript strict mode enabled
- No unused variables or parameters allowed
- Use `bun run check` before committing

### Git Hooks
Husky runs pre-commit hooks (configured in `.husky/`). Commitlint enforces conventional commits.
