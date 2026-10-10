# SHREENIL.COM â€” STUDENT MVP MASTER IMPLEMENTATION

> **â€œEvery Student. One Digital Twin. One Lifetime Learning Journey.â€**

---

## 1. Overview & Architecture

Shreenil is an AI-first Virtual University and holistic learning ecosystem. This repository contains the complete **Student MVP** structured as a production-oriented Modular Monolith:

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + Lucide + Zustand + TanStack Query
- **Backend**: Java 21 + Spring Boot 3.3.4 + Spring Security OAuth2 + Spring Data JPA + Hibernate + Flyway + OpenAPI (SpringDoc)
- **Database**: PostgreSQL with UUID keys and immutable Flyway schema migrations (`V1` through `V9`)
- **Authentication**: Keycloak OpenID Connect / OAuth2 Resource Server JWT validation + Developer bypass mode
- **Curriculum**: Real **Vishwakarma Institute of Technology (VIT)** B.Tech CSE (Artificial Intelligence) AY 2026-27 syllabus data derived directly from `syllabus.pdf`.

---

## 2. Directory Structure

```
shreenil/
â”œâ”€â”€ backend/                        # Spring Boot 3.3.4 Application
â”‚   â”œâ”€â”€ src/main/java/com/shreenil/
â”‚   â”‚   â”œâ”€â”€ config/                 # Security, CORS, OpenAPI Swagger
â”‚   â”‚   â”œâ”€â”€ common/                 # GlobalExceptionHandler, ApiResponse, ErrorCode, BaseEntity
â”‚   â”‚   â”œâ”€â”€ auth/                   # Keycloak JWT Converter, UserPrincipal, SecurityUtils
â”‚   â”‚   â”œâ”€â”€ user/                   # User profile, role-aware navigation
â”‚   â”‚   â”œâ”€â”€ academic/               # VIT Syllabus: Institution, Program, Course, Unit, Topic, Practical, CO
â”‚   â”‚   â”œâ”€â”€ profile/                # StudentProfile, Skills, Interests, Digital Twin Lite, Dashboard
â”‚   â”‚   â”œâ”€â”€ classroom/              # LiveClasses (Jitsi), RecordedLectures, TimetableSlots
â”‚   â”‚   â”œâ”€â”€ homework/               # Assignments, Submissions
â”‚   â”‚   â”œâ”€â”€ attendance/             # AttendanceRecords, Compliance summaries
â”‚   â”‚   â”œâ”€â”€ exams/                  # GradeRecords, Semester evaluations, Official Report Card
â”‚   â”‚   â”œâ”€â”€ library/                # Digital library catalog & search
â”‚   â”‚   â”œâ”€â”€ ai/                     # Syllabus-aware AI Learning Mentor service boundary
â”‚   â”‚   â””â”€â”€ health/                 # Health check endpoint
â”‚   â”œâ”€â”€ src/main/resources/
â”‚   â”‚   â”œâ”€â”€ db/migration/           # Flyway migrations V1__core_auth to V9__seed_demo_student
â”‚   â”‚   â””â”€â”€ application.yml         # Spring configuration profiles (dev, test, prod)
â”‚   â””â”€â”€ pom.xml                     # Maven dependencies & build configuration
â”œâ”€â”€ frontend/                       # React 19 + TypeScript + Vite Frontend
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/ui/          # Premium design system (Buttons, Cards, Badges, Tables, Inputs)
â”‚   â”‚   â”œâ”€â”€ components/layout/      # DashboardLayout, Sidebar, Topbar, Search, CourseLayout
â”‚   â”‚   â”œâ”€â”€ services/api/           # Typed API modules (studentApi, academicApi, homeworkApi, etc.)
â”‚   â”‚   â”œâ”€â”€ pages/
â”‚   â”‚   â”‚   â”œâ”€â”€ dashboards/         # StudentDashboard (Digital Twin Lite)
â”‚   â”‚   â”‚   â”œâ”€â”€ student/            # Academics, Courses, Timetable, Homework, Attendance, Report Card, Classroom, Library, AI Mentor
â”‚   â”‚   â”‚   â””â”€â”€ common/             # Profile, Settings, ComingSoon modules (Sports, Spiritual, Innovation, Career, XR)
â”‚   â”‚   â””â”€â”€ routes/AppRoutes.tsx    # Role-based & student navigation routes
â”‚   â””â”€â”€ package.json
â”œâ”€â”€ infra/                          # Docker & Local Infrastructure
â”‚   â”œâ”€â”€ docker-compose.yml          # PostgreSQL, Keycloak, Backend services
â”‚   â”œâ”€â”€ Dockerfile                  # Multi-stage production container build
â”‚   â””â”€â”€ keycloak/
â”‚       â””â”€â”€ shreenil-realm.json     # Keycloak realm with ROLE_STUDENT and demo student
â”œâ”€â”€ docs/                           # Architecture, API specifications & syllabus source
â”œâ”€â”€ .env.example                    # Environment configuration template
â””â”€â”€ README.md                       # Master engineering documentation
```

---

## 3. Real VIT Curriculum & Demo Data

The academic curriculum is modeled hierarchically and seeded from **VIT B.Tech CSE (AI) AY 2026-27** (`docs/academic/syllabus.pdf`):

- **Institution**: Vishwakarma Institute of Technology, Pune
- **Program**: B.Tech Computer Science & Engineering (Artificial Intelligence)
- **Academic Year**: AY 2026-27 (Year 3 / Semester V / Module V)
- **Courses**:
  - `CI3001` â€” Deep Learning (4.0 Credits, 3 Theory + 2 Lab, Units I-VI, Practicals 1-12, CO1-CO6)
  - `CI3202` â€” Operating System (4.0 Credits)
  - `CI3003D` â€” MLOPS (4.0 Credits)
  - `CI3203B` â€” Distributed and Federated Learning (4.0 Credits)
  - `CI3203A` â€” Ethical and Responsible AI (4.0 Credits)
  - `CI3203C` â€” Information Security (4.0 Credits)

### Real vs. Mock Separation
- **Real Academic Data**: Institution, Program, Course codes, Credits, Theory/Lab hours, Prerequisites, Objectives, Relevance, Units, Topics, Practicals, Course Outcomes, Assessment Scheme, Textbooks.
- **Mock Student Activity**: Aarav Sharma's attendance records, quiz submissions, study streak (18 days), CGPA (8.92), and AI mentor chat interactions.

---

## 4. Key REST API Endpoints (`/api/v1/`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Service health status |
| `GET` | `/api/v1/users/me` | Current authenticated user identity |
| `GET` | `/api/v1/users/me/navigation` | Dynamic role-aware navigation items |
| `GET` | `/api/v1/students/me` | Student profile & Digital Twin Lite |
| `GET` | `/api/v1/students/me/dashboard` | Aggregated student dashboard |
| `GET` | `/api/v1/students/me/progress` | Skill proficiencies & completion metrics |
| `GET` | `/api/v1/academic/programs` | List degree programs |
| `GET` | `/api/v1/academic/courses` | List courses (VIT Module V) |
| `GET` | `/api/v1/academic/courses/{id}` | Deep Learning syllabus, units & practicals |
| `GET` | `/api/v1/students/me/timetable` | Weekly timetable schedule |
| `GET` | `/api/v1/students/me/homework` | Assignment list with submission statuses |
| `POST` | `/api/v1/homework/{id}/submission` | Submit assignment solution |
| `GET` | `/api/v1/students/me/attendance` | Attendance compliance & logs |
| `GET` | `/api/v1/students/me/report-card` | Official transcript & semester GPA |
| `GET` | `/api/v1/students/me/classes` | Scheduled live virtual classes (Jitsi) |
| `GET` | `/api/v1/library/items` | Searchable digital library repository |
| `POST` | `/api/v1/ai/chat` | AI Learning Mentor conversation boundary |

---

## 5. Local Quickstart

### Prerequisites
- Java 21+ (`java -version`)
- Maven 3.9+ (`mvn -version`)
- Node.js 20+ & npm (`npm -v`)
- Docker & Docker Compose (Optional for full containerized stack)

### Option A: Run Full Stack via Docker (Recommended)
```bash
docker compose up -d --build
```
- **Student Portal (Frontend)**: `http://localhost:5173`
- **REST API Backend**: `http://localhost:8081`
- **Swagger API Docs**: `http://localhost:8081/docs` (or `/swagger-ui.html`)
- **Keycloak IAM**: `http://localhost:8080` (admin / admin)
- **PostgreSQL Database**: `localhost:5432` (`shreenildb` / `shreenil`)

### Option B: Local Hybrid Development (Infra in Docker + Local Dev)

#### Step 1: Start Infrastructure (PostgreSQL & Keycloak)
```bash
docker compose up -d postgres keycloak
```

#### Step 2: Start Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
```
- Swagger API Docs: `http://localhost:8081/docs`
- Health Endpoint: `http://localhost:8081/api/v1/health`

#### Step 3: Start React Frontend
```bash
cd frontend
npm install
npm run dev
```
- Student Portal: `http://localhost:5180` (or configured port)
- Student Portal: `http://localhost:5173`

---

## 6. Automated Testing & Verification

### Backend Tests (JUnit 5 + Spring Boot Test + MockMvc)
```bash
cd backend
mvn test
```
*Result: 7/7 tests pass cleanly.*

### Frontend Tests (Vitest) & Production Build
```bash
cd frontend
npm test
npm run build
```
*Result: 8/8 tests pass, production bundle generated cleanly.*
