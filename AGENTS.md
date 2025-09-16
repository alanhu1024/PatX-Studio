# Repository Guidelines

## Project Structure & Module Organization
Monorepo rooted at `pnpm` + Turborepo. Frontend lives under `apps/`: `apps/web-app` (Next.js, TypeScript, Tailwind) and `apps/landing-page` (Next.js with Biome). The FastAPI backend sits in `services/`, with routers in `services/api`, shared config in `services/config.py`, and domain code split across `services/{analyzers,processors,models,schemas,utils}`. Database helpers reside in `services/database`. Configuration templates: `.env.example` in the root and `services/env.example` for the API service.

## Build, Test, and Development Commands
`pnpm dev` launches the Turbo task graph and boots all dev servers. Use `pnpm -C apps/web-app dev` or `pnpm -C apps/landing-page dev` for focused frontend work. Run `python services/main.py` (or `uvicorn services.main:app --reload --port 8001`) to develop the API. Build with `pnpm build`, lint via `pnpm lint`, and execute the full test suite using `pnpm test`. Generate contracts, when present, with `pnpm run codegen`.

## Coding Style & Naming Conventions
Use 2-space indentation for TS/JS. ESLint enforces style in both apps; format the landing page with `pnpm -C apps/landing-page run format`. Components follow `PascalCase` filenames, hooks use `useCamelCase.ts`, and utility paths prefer kebab-case (e.g. `src/lib/api-client.ts`). Backend Python adheres to Black (line length 88) and Flake8, with `snake_case` functions/modules and `PascalCase` classes.

## Testing Guidelines
Backend tests belong in `services/tests/` as `test_*.py` modules and run with `pytest -q` (or `uv run pytest -q`). Frontend features should use React Testing Library with Vitest/Jest, colocated as `Component.test.tsx`. Cover new logic branches and add integration tests around critical API flows when introducing endpoints.

## Commit & Pull Request Guidelines
Write imperative commits prefixed with `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, or `chore:`. Pull requests need a short summary, linked issues, screenshots for UI changes, and explicit test instructions. Verify `pnpm lint` and backend tests before requesting review.

## Security & Configuration Tips
Never commit real secrets. Copy `.env.example` → `.env` and `services/env.example` → `services/.env`, then adjust locally. Review `services/config.py` to ensure environment overrides are in place prior to deployment.
