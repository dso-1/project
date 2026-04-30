# Repository Guidelines

## Project Structure & Module Organization
`src/` contains the application code. Route files live in `src/routes/`, shared UI and utilities in `src/shared/`, and domain work is grouped by feature under `src/features/` such as `auth/`, `rooms/`, `reservations/`, `users/`, and `dashboard/`. Static assets are in `public/`. Database schema, migrations, and seed data live in `prisma/`. Generated artifacts in `generated/` and `src/routeTree.gen.ts` should be treated as build output and not edited by hand.

## Build, Test, and Development Commands
Use Bun for local workflows:

- `bun dev` runs the TanStack Start app on `http://localhost:3000`.
- `bun run build` creates a production build and is also enforced by the Husky pre-push hook.
- `bun run preview` serves the production build locally.
- `bun run test` runs Vitest once.
- `bun run lint` checks code with Biome.
- `bun run format` rewrites formatting.
- `bun run db:push`, `bun run db:generate`, and `bun run db:seed` update Prisma schema state and seed local data.

## Coding Style & Naming Conventions
This repo uses TypeScript, Biome, and tabs for indentation. Prefer single quotes in TS/JS files. Follow the existing feature-first layout and keep shared primitives in `src/shared/`. Use `kebab-case` for file names (`admin-users-page.tsx`), PascalCase for React components, and `use-` prefixes for hooks. Run `bun run format` before opening a PR.

## Testing Guidelines
Vitest and React Testing Library are installed. Add tests next to the code they cover using `*.test.ts` or `*.test.tsx`; for example, `src/features/auth/components/login-form.test.tsx`. Focus tests on form flows, route guards, and API/data hooks. Run `bun run test` and `bun run build` before pushing.

## Commit & Pull Request Guidelines
Commitlint enforces Conventional Commits with lowercase subjects and a 72-character header limit. Prefer messages like `feat: add room approval dialog` or `fix: handle missing session`. Pull requests should include a concise summary, linked issue if applicable, screenshots for UI changes, and notes for schema or environment updates.

## Security & Configuration Tips
Copy `.env.example` to `.env` for local setup. Do not commit secrets or database credentials. When schema changes affect Prisma models, include the migration or updated Prisma workflow in the PR so reviewers can reproduce the change.
