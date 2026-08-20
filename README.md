# MERN Kit — without Docker

A production-minded **MongoDB · Express · React · Node** starter for local development.

Not a toy counter demo. You get auth, owned resources, validation, security headers, and a structured React client you can grow into a real app.

## What's included

### Backend (`server/`)
- JWT auth (register / login / logout / me) with httpOnly cookie + Bearer token
- Password hashing with bcrypt
- Protected item CRUD scoped per user
- `express-validator` request validation
- Helmet, CORS credentials, rate limiting, HPP, mongo injection sanitization
- Central `AppError` + async handler + consistent JSON errors
- Pagination, search, and completed filter on items
- Env validation on boot + graceful shutdown

### Frontend (`client/`)
- Vite + React
- React Router (public / protected / guest-only routes)
- Auth context with session bootstrap
- Axios API layer (`withCredentials` + Bearer header)
- Landing, login, register, and dashboard with search/filters
- Clean, distinctive UI (not a generic purple template)

## Quick start

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally, or a MongoDB Atlas URI

### 2. Install

```bash
git clone -b mern-without-docker https://github.com/sheikhali425/bioler-plates.git my-mern-app
cd my-mern-app

cp server/.env.example server/.env
# set MONGODB_URI and a strong JWT_SECRET

npm run install:all
```

### 3. Run

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Client | http://localhost:5173 |
| API | http://localhost:5000 |
| Health | http://localhost:5000/api/health |

Vite proxies `/api` → Express, so the browser only talks to `:5173`.

## Project structure

```
.
├── client/
│   └── src/
│       ├── api/           # axios client + auth/items endpoints
│       ├── components/    # layout, guards, item UI
│       ├── context/       # AuthProvider
│       ├── pages/         # Home, Login, Register, Dashboard
│       └── App.jsx
├── server/
│   └── src/
│       ├── config/        # env + db
│       ├── controllers/
│       ├── middleware/    # auth, validate, errors
│       ├── models/
│       ├── routes/
│       ├── utils/
│       ├── validators/
│       ├── app.js
│       └── index.js
└── package.json           # concurrently scripts
```

## API reference

### Auth
| Method | Path | Auth | Body |
|--------|------|------|------|
| POST | `/api/auth/register` | No | `{ name, email, password }` |
| POST | `/api/auth/login` | No | `{ email, password }` |
| POST | `/api/auth/logout` | No | — |
| GET | `/api/auth/me` | Yes | — |

Password rules: min 8 chars, at least one letter and one number.

### Items (all require auth)
| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/items` | Query: `page`, `limit`, `completed`, `q` |
| POST | `/api/items` | `{ title, description? }` |
| PUT | `/api/items/:id` | `{ title?, description?, completed? }` |
| DELETE | `/api/items/:id` | Owner only |

### Health
| Method | Path |
|--------|------|
| GET | `/api/health` |

## Environment

`server/.env`:

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `MONGODB_URI` | Yes | — | Mongo connection string |
| `JWT_SECRET` | Yes | — | Sign tokens (use a long random value) |
| `JWT_EXPIRES_IN` | No | `7d` | Token lifetime |
| `PORT` | No | `5000` | API port |
| `CLIENT_URL` | No | `http://localhost:5173` | CORS origin |
| `NODE_ENV` | No | `development` | `production` enables stricter checks |

## Scripts

```bash
npm run install:all   # root + server + client deps
npm run dev           # API + React together
npm run dev:server
npm run dev:client
npm run build         # production client build
npm start             # run API only
```

## Suggested next steps

- Add roles / admin routes
- Refresh tokens + stricter cookie CSRF
- File uploads
- Tests (Jest / Vitest + Supertest)
- CI pipeline

## License

MIT — see `LICENSE`.
