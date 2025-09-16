# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by `pnpm` + Turborepo.
- Frontend apps: `apps/web-app` (Next.js, TypeScript, Tailwind, ESLint) and `apps/landing-page` (Next.js, Biome).
- Backend (FastAPI): `services/` with API routers in `services/api`, config in `services/config.py`, data in `services/database`, and domain code in `services/{analyzers,processors,models,schemas,utils}`.
- Env templates: `.env.example` (root) and `services/env.example`. Copy to local `.env` files.
- Backend tests live in `services/tests/`.

## Build, Test, and Development Commands
- `pnpm dev` — start all app dev servers via Turbo.
- `pnpm -C apps/web-app dev` or `pnpm -C apps/landing-page dev` — app-only dev.
- `pnpm build` — build all packages respecting Turbo’s task graph.
- `pnpm lint` — run linters across workspace. `pnpm -C apps/landing-page run format` to format with Biome.
- `pnpm test` — run workspace tests.
- Backend local run: `python services/main.py` (http://localhost:8001) or `uvicorn services.main:app --reload --port 8001`.
- Optional codegen: `pnpm run codegen` if contracts are present.

## Coding Style & Naming Conventions
- JavaScript/TypeScript: 2-space indent; ESLint in both apps. In `apps/landing-page`, use Biome for formatting.
- Components use `PascalCase` (e.g., `FeatureSection.tsx`); hooks `useCamelCase.ts`; modules/paths kebab/snake-case (e.g., `src/lib/api-client.ts`).
- Python (`services`): Black (line length 88) + Flake8; functions/modules `snake_case`, classes `PascalCase`.

## Testing Guidelines
- Backend: `pytest` in `services/tests/` with files named `test_*.py`. Run `pytest -q` (or `uv run pytest -q`).
- Frontend: prefer React Testing Library with Vitest/Jest. Co-locate as `Component.test.tsx` next to components.
- Aim for coverage on new code paths; add integration tests for critical API flows.

## Commit & Pull Request Guidelines
- Commits: imperative, scoped prefixes — `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
- PRs include: concise summary, context/linked issues, screenshots for UI changes, and clear test instructions.
- Ensure `pnpm lint` passes and backend tests are green before requesting review.

## Security & Configuration
- Never commit real API keys or secrets. Copy `.env.example` → `.env` (root) and `services/env.example` → `services/.env`.
- Review `services/config.py`; override via environment variables in production.
