# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend Development
- **Start development server**: `pnpm dev` (runs all frontend apps in parallel via Turbo)
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Type check (web app)**: `cd apps/web && bunx tsc --noEmit`
- **Format code (web app)**: `cd apps/web && bunx biome format --write`
- **Run tests**: `pnpm test`

### Backend Development
- **Start backend services**: `uv run fastapi dev services/{service_name}/app/main.py --port {port}`
- **Run Python tests**: `uv run pytest -q`
- **Start infrastructure**: `docker compose -f deploy/compose/docker-compose.yml up -d`

### Code Generation
- **Generate TypeScript and Python code from contracts**: `pnpm run codegen`

## Architecture Overview

This is a monorepo project using:
- **Frontend**: pnpm workspaces with Turbo for build orchestration
- **Backend**: Python with uv workspace for service management
- **Package manager**: pnpm (v10.10.0) for JavaScript, uv for Python

### Repository Structure

- **apps/**
  - `web/`: Next.js 13+ marketing/landing site with static export, uses shadcn/ui components and Tailwind CSS
  - `app/`: Main application (structure exists but no package.json present)
  
- **services/**: Python microservices (FastAPI-based)
  - auth, billing, claim_chart, documents, gateway, search, worker
  - Each service follows domain-driven design with api/clients/core/domain/services structure

- **clients/**: Platform-specific clients
  - desktop, mobile (Android/iOS), word-plugin

- **libs/**: Shared libraries for backend services
  - auth (JWT, RBAC), db, schemas, common utilities

- **contracts/**: API contracts and code generation
  - OpenAPI specifications and Protocol Buffers
  - Code generation scripts for TypeScript and Python

- **deploy/**: Deployment configurations
  - Docker Compose, Kubernetes manifests (base + overlays for dev/staging/prod)

## Key Configuration

- **Next.js web app**: 
  - Static export mode (`output: 'export'`)
  - TypeScript strict mode enabled
  - Uses `@/*` path alias for `./src/*`
  - JSX runtime: `same-runtime`

- **Turbo tasks**: dev (no cache), lint, build (with dependencies), test
- **Workspace members**: apps/*, packages/*, clients/* (pnpm), services/*, libs/* (uv)