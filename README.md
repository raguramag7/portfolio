# Portfolio Web Application

A full-stack portfolio application built with **React (Vite)** on the frontend and **Spring Boot** on the backend, using **PostgreSQL/Neon** for data storage and **JWT** for authentication.

---

## Project Structure

```
portfolio/
├── backend/          ← Spring Boot (Java 17, Maven)
│   └── src/main/java/com/portfolio/
│       ├── controller/       AuthController, ProjectController, BlogController, ContactController
│       ├── service/          AuthService, ProjectService, BlogService, ContactService
│       ├── repository/       JPA repositories
│       ├── model/            User, Project, Blog, ContactMessage
│       ├── dto/              AuthDTO, ProjectDTO, BlogDTO, ContactDTO
│       ├── security/         JwtUtil, JwtAuthFilter, CustomUserDetailsService
│       └── config/           SecurityConfig, DataSeeder
│
└── frontend/         ← React + Vite (Node 18+)
    └── src/
        ├── pages/            Home, About, Skills, Projects, Blog, BlogPost, Contact, Login, AdminDashboard
        ├── components/
        │   ├── layout/       Layout, Navbar, Footer, ProtectedRoute
        │   └── ui/           ProjectCard, BlogCard, Modal
        ├── context/          AuthContext (JWT state)
        └── services/         api.js (Axios)
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| Java | 17+ |
| Maven | 3.8+ |
| Node.js | 18+ |
| PostgreSQL | 14+ / Neon DB |

---

## Backend Setup

### 1. Create PostgreSQL Database

```sql
CREATE DATABASE neondb;
```

> The app will auto-create tables on first run via `spring.jpa.hibernate.ddl-auto=update`.

### 2. Configure application.properties

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://your-neon-host:5432/neondb?sslmode=require
spring.datasource.username=your-db-username
spring.datasource.password=your-db-password

jwt.secret=your-very-secret-key-must-be-at-least-256-bits-long-for-hs256-algorithm
jwt.expiration=86400000

admin.lockId=ramdev19

cors.allowed-origins=http://localhost:5173
```

> **Important:** Change `jwt.secret` to a long random string (32+ chars) in production.
> **Important:** Change `admin.lockId` to your preferred password.

### 3. Run the Backend

```bash
cd portfolio/backend
mvn spring-boot:run
```

The server starts on **http://localhost:8080**

On first run, the `DataSeeder` automatically creates an admin user with the Lock ID configured in application properties.

---

## Frontend Setup

### 1. Install dependencies

```bash
cd portfolio/frontend
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

The app runs on **http://localhost:5173**

The Vite proxy forwards all `/api/*` requests to `http://localhost:8080` automatically.

---

## Accessing the App

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Home page |
| `http://localhost:5173/about` | About Me |
| `http://localhost:5173/skills` | Skills |
| `http://localhost:5173/projects` | Projects |
| `http://localhost:5173/blog` | Blog |
| `http://localhost:5173/contact` | Contact |
| `http://localhost:5173/login` | Admin login |
| `http://localhost:5173/admin` | Admin dashboard (protected) |

**Default admin credentials:**
- Lock ID: `admin123` (set in `application.properties`)

---

## API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/verify` | Authenticated |

### Projects
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/projects` | Public |
| GET | `/api/projects/{id}` | Public |
| POST | `/api/projects` | Admin only |
| PUT | `/api/projects/{id}` | Admin only |
| DELETE | `/api/projects/{id}` | Admin only |

### Blogs
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/blogs` | Public |
| GET | `/api/blogs/{id}` | Public |
| POST | `/api/blogs` | Admin only |
| PUT | `/api/blogs/{id}` | Admin only |
| DELETE | `/api/blogs/{id}` | Admin only |

### Contact
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/contact` | Public |
| GET | `/api/contact/messages` | Admin only |

---

## Admin Features

After logging in at `/login` with your Lock ID:

1. **Projects page** — Edit / Delete buttons appear on each project card. "Add Project" button appears at top.
2. **Blog page** — Edit / Delete buttons appear on each post. "New Post" button appears at top.
3. **Admin Dashboard** — View stats (project count, blog count, message count) and recent contact messages.

---

## Customization Checklist

Before deploying or sharing, update these values:

- [ ] `backend/src/main/resources/application.properties` → DB password, JWT secret, admin Lock ID
- [ ] `frontend/src/pages/Contact.jsx` → Your real email, phone, LinkedIn, GitHub
- [ ] `frontend/src/pages/About.jsx` → Your real name, bio, education
- [ ] `frontend/src/pages/Skills.jsx` → Your actual skills
- [ ] `frontend/src/pages/Home.jsx` → Your name and tagline in the hero section
- [ ] `frontend/index.html` → Update `<title>`

---

## Production Build

### Frontend
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### Backend
```bash
cd backend
mvn clean package
java -jar target/portfolio-backend-1.0.0.jar
```

For production, serve the frontend `dist/` folder via Nginx or configure Spring Boot to serve static files.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6 |
| HTTP Client | Axios |
| Backend | Spring Boot 3.2, Java 17 |
| Auth | Spring Security + JWT (jjwt) |
| ORM | JPA / Hibernate |
| Database | MySQL 8 |
| Build tools | Maven, npm |

---

## Troubleshooting

**CORS errors:** Make sure `cors.allowed-origins=http://localhost:5173` in application.properties and the frontend is running on port 5173.

**401 on admin routes:** Your JWT may have expired (default 24h). Log out and log in again.

**DB connection refused:** Make sure MySQL is running and the credentials in application.properties are correct.

**Port conflict:** Change `server.port` in application.properties or the `port` in vite.config.js.
