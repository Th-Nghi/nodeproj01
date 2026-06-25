# NodeProj01

A minimal full-stack example with:
- `frontend/` — Vite-powered browser UI
- `backend/` — Flask API service
- `docker-compose.yml` — root-level compose setup for frontend, backend, and nginx
- `.devcontainer/` — VS Code devcontainer metadata
- `jsscripts/` — simple standalone Node.js script examples
- `pyscripts/` — simple standalone Python script examples

## Run the full stack

From the repository root:

```bash
docker compose -f docker-compose.yml up -d --build
```

Open in the browser at:

```bash
http://localhost:8080
```

## Stop and cleanup

```bash
docker compose -f docker-compose.yml down --rmi all --volumes --remove-orphans
```

## Frontend development

The frontend source lives in `frontend/`.
If the app is already running with the bind mount, changes to `frontend/index.html` and `frontend/main.js` should be visible after a browser refresh.

## Backend development

The backend source lives in `backend/`.
The Flask app exposes:

- `/api/hello`
- `/api/weather?city=CityName`
- `/api/client-info`

## Sample scripts

Run the sample scripts from the repo root:

```bash
python3 pyscripts/hello.py
node jsscripts/hello.js
```

## Project structure

```
.
├── backend/
├── docker-compose.yml
├── frontend/
├── jsscripts/
├── pyscripts/
├── README.md
└── scripts/
```

## Notes

- `docker-compose.yml` is kept at the root for a reusable project blueprint.
- `.devcontainer/` remains for VS Code Dev Container metadata and local environment settings.
