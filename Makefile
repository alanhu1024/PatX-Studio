dev:
	pnpm dev                        # 前端 web+app
	uv run fastapi dev services/claim_chart/app/main.py --port 8081

up:
	docker compose -f deploy/compose/docker-compose.yml up -d

test:
	uv run pytest -q

codegen:
	pnpm run codegen