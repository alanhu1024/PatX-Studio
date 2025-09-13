# Repository Guidelines

## Project Structure & Module Organization
- Root workspace managed by `pnpm` + Turborepo.
- Frontend apps (Next.js): `apps/web-app` (TS, Tailwind, ESLint) and `apps/landing-page` (Next.js, Biome).
- Backend service (FastAPI): `services/` with API routers under `services/api`, configs in `services/config.py`, data in `services/database`, and domain code in `services/{analyzers,processors,models,schemas,utils}`.
- Examples: `.env.example` (root) and `services/env.example` for configuration templates.

## Build, Test, and Development Commands
- Run all dev tasks via Turbo: `pnpm dev` (starts app dev servers; persistent).
- App-only dev: `pnpm -C apps/web-app dev` or `pnpm -C apps/landing-page dev`.
- Build all: `pnpm build` (respects Turbo task graph). Lint all: `pnpm lint`. Tests: `pnpm test`.
- FastAPI service (local): `python services/main.py` (defaults to http://localhost:8001). Alternative: `uvicorn services.main:app --reload --port 8001`.
- Codegen (if contracts present): `pnpm run codegen`.

## Coding Style & Naming Conventions
- JavaScript/TypeScript: 2-space indent; ESLint in both apps; Biome formatting in `apps/landing-page` (`pnpm -C apps/landing-page run format`).
  - Components: `PascalCase` files (e.g., `FeatureSection.tsx`); hooks `useCamelCase.ts`.
  - Modules/paths: kebab/snake-case (e.g., `src/lib/api-client.ts`).
- Python (`services`): Black line length 88, Flake8 for linting; `snake_case` for functions/modules, `PascalCase` for classes.

## Testing Guidelines
- Backend: `pytest` (see `services/pyproject.toml`).
  - Place tests in `services/tests/`, name `test_*.py`. Run with `pytest -q` (or `uv run pytest -q`).
- Frontend: no framework enforced; prefer React Testing Library + Vitest/Jest for new components. Co-locate as `Component.test.tsx`.
- Aim for coverage on new code paths; add integration tests around critical API flows.

## Commit & Pull Request Guidelines
- Use imperative, scoped messages. Preferred prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:` (Git history shows mixed style; standardize going forward).
- PRs must include: concise summary, context/linked issues, screenshots for UI changes, and clear test instructions. Ensure `pnpm lint` and backend tests pass.

## Security & Configuration
- Never commit real API keys. Copy `.env.example` → `.env` (root) and `services/env.example` → `services/.env`, then edit locally.
- Review `services/config.py` before deploying; override via environment variables in production.
