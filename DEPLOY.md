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
| `SPRING_DATASOURCE_URL` | JDBC PostgreSQL URL | `jdbc:postgresql://ep-gentle-field-a70l4moy.ap-southeast-2.aws.neon.tech:5432/neondb?sslmode=require` |
| `SPRING_DATASOURCE_USERNAME` | DB user | `neondb_owner` |
| `SPRING_DATASOURCE_PASSWORD` | DB password | *(pre-configured)* |
| `JWT_SECRET` | JWT signing key (≥256 bits) | *(insecure default — change this!)* |
| `ADMIN_LOCK_ID` | Admin login ID | `ramdev19` |
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
SPRING_DATASOURCE_URL=jdbc:postgresql://your-db-host/neondb?sslmode=require \
SPRING_DATASOURCE_USERNAME=myuser \
SPRING_DATASOURCE_PASSWORD=mypassword \
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
