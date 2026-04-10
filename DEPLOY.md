# Deployment Guide

## Project Structure
```
portfolio/
├── backend/   → Spring Boot (Java 17, Maven)
├── frontend/  → React + Vite
```

---

## Backend Deployment

### Environment Variables
Set these on your server / hosting platform:

| Variable | Description | Default |
|---|---|---|
| `DB_URL` | JDBC MySQL URL | `jdbc:mysql://localhost:3306/portfolio` |
| `DB_USERNAME` | DB user | `root` |
| `DB_PASSWORD` | DB password | *(empty)* |
| `JWT_SECRET` | JWT signing key (≥256 bits) | *(insecure default — change this!)* |
| `ADMIN_LOCK_ID` | Admin login ID | `rangan76` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated allowed origins | `http://localhost:5173` |
| `PORT` | Server port | `8080` |

### Build & Run
```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/portfolio-backend-1.0.0.jar
```

Or with env vars:
```bash
DB_URL=jdbc:mysql://your-db-host/portfolio \
DB_USERNAME=myuser \
DB_PASSWORD=mypassword \
JWT_SECRET=your-256-bit-secret-key-here \
ADMIN_LOCK_ID=yourAdminId \
CORS_ALLOWED_ORIGINS=https://your-frontend.com \
java -jar target/portfolio-backend-1.0.0.jar
```

---

## Frontend Deployment

### Environment Variables
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Full backend API URL (e.g. `https://api.yoursite.com/api`). Leave empty when proxying via Vite locally. |

### Build
```bash
cd frontend
npm install
npm run build   # outputs to frontend/dist/
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Nginx, etc.).

> **SPA routing**: Configure your host to serve `index.html` for all routes.

#### Nginx example
```nginx
location / {
  root /var/www/portfolio/dist;
  try_files $uri $uri/ /index.html;
}
```

---

## Local Development
```bash
# Terminal 1 – backend
cd backend && ./mvnw spring-boot:run

# Terminal 2 – frontend
cd frontend && npm install && npm run dev
```
The Vite dev server proxies `/api` → `http://localhost:8080` automatically.
