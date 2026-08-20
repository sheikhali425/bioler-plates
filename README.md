# MERN Kit — with Docker

Production-minded **MongoDB · Express · React · Node** starter with first-class Docker support.

Same app as `mern-without-docker`, plus containerized MongoDB, API, and client for one-command local/prod-like runs.

## Stack

| Layer | Tech |
|-------|------|
| Client | React + Vite (nginx in production images) |
| API | Express + JWT auth + validation + security middleware |
| DB | MongoDB 7 |
| Orchestration | Docker Compose (prod + hot-reload dev) |

## Quick start (Docker)

### Prerequisites
- Docker Desktop / Docker Engine + Compose plugin

### 1. Env

```bash
cp .env.example .env
# set a strong JWT_SECRET
```

### 2. Production-like stack

```bash
npm run docker:up
# or: docker compose --env-file .env up --build -d
```

| Service | URL |
|---------|-----|
| App (nginx + React) | http://localhost:8080 |
| API (direct) | http://localhost:5050 |
| Health | http://localhost:5050/api/health |
| MongoDB | localhost:27017 |

Nginx proxies `/api` → the Express service, so the browser talks to one origin.

```bash
npm run docker:logs
npm run docker:down
```

### 3. Dev stack (hot reload)

```bash
npm run docker:dev
```

| Service | URL |
|---------|-----|
| Vite client | http://localhost:5173 |
| API | http://localhost:5050 |

Source folders are bind-mounted; Nodemon + Vite HMR work inside containers.

```bash
npm run docker:dev:down
```

## Run without Docker (optional)

Still supported on this branch:

```bash
cp server/.env.example server/.env
# start local MongoDB, then:
npm run install:all
npm run dev
```

## Project structure

```
.
├── docker-compose.yml       # prod-like: mongo + server + nginx client
├── docker-compose.dev.yml   # hot reload: mongo + nodemon + vite
├── .env.example             # compose variables (JWT, ports)
├── client/
│   ├── Dockerfile           # multi-stage Vite build → nginx
│   ├── Dockerfile.dev
│   └── nginx.conf           # SPA + /api proxy
└── server/
    ├── Dockerfile           # production Node image
    └── Dockerfile.dev
```

## Compose environment

Root `.env` (from `.env.example`):

| Variable | Default | Purpose |
|----------|---------|---------|
| `JWT_SECRET` | required (prod) | Token signing key |
| `JWT_EXPIRES_IN` | `7d` | Token lifetime |
| `CLIENT_URL` | `http://localhost:8080` | CORS origin for API |
| `CLIENT_PORT` | `8080` | Host port for nginx client |
| `CLIENT_DEV_PORT` | `5173` | Host port for Vite |
| `API_PORT` | `5050` | Host port for API |
| `MONGO_PORT` | `27017` | Host port for MongoDB |

Inside Compose, the API uses `MONGODB_URI=mongodb://mongo:27017/mern_boilerplate`.

## What's included (app features)

### Backend
- JWT auth (register / login / logout / me) — cookie + Bearer
- bcrypt passwords, user-owned items
- Validation, Helmet, rate limits, HPP, mongo sanitize
- Pagination, search, filters
- Health checks used by Docker

### Frontend
- React Router + auth guards
- Auth context + axios API layer
- Landing, login, register, dashboard

## API (short)

| Area | Paths |
|------|-------|
| Auth | `POST /api/auth/register`, `login`, `logout`, `GET /api/auth/me` |
| Items | `GET/POST /api/items`, `PUT/DELETE /api/items/:id` |
| Health | `GET /api/health` |

## Clone this branch

```bash
git clone -b mern-with-docker https://github.com/sheikhali425/bioler-plates.git my-mern-docker
cd my-mern-docker
cp .env.example .env
npm run docker:up
```

## License

MIT — see `LICENSE`.
