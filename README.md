# Todo Dockerized (React + Express + Postgres)

Services:
- Frontend: React + Vite on port 3000
- Backend: Express on port 5000
- Postgres: port 5432

Run with Docker Compose:

```bash
docker-compose up --build
```

Open the frontend at http://localhost:3000

Notes:
- Backend will create the `todos` table automatically on start.
- Use the `.env.example` in `backend/` as a reference for DB settings.
