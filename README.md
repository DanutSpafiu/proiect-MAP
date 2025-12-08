# Catalog Note Elevi

A modern web app for managing students (elevi), subjects (materii), and grades (note) in a school context. Built with React (frontend), Node.js/Express (backend), and Prisma (SQLite).

## Features

- List all students (elevi) with class info
- Add, view, and delete students
- Add grades (note) for each student, selecting subject and value
- View all grades for a student, grouped by subject
- Color-coded grades: red (<5), yellow-orange (5-7), green (8+)
- Average grade displayed; shows "Promovat" if >= 4.5, "Nepromovat" if below
- Responsive, modern UI with clear navigation

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js, Express, Prisma ORM
- **Database:** SQLite (via Prisma)
- **Styling:** CSS (custom, responsive)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/DanutSpafiu/proiect-MAP.git
cd proiect-MAP
```

### 2. Install dependencies
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Set up the database
- The app uses SQLite by default (see `backend/prisma/schema.prisma`).
- To initialize the database and Prisma client:
```bash
cd ../backend
npx prisma migrate dev --name init
npx prisma generate
```
- (Optional) To view/edit data, run:
```bash
npx prisma studio
```

### 4. Start the backend server
```bash
npm run dev
# Server runs on http://localhost:3000
```

### 5. Start the frontend
```bash
cd ../frontend
npm run dev
# App runs on http://localhost:5173
```

## Usage
- Open the frontend in your browser (`http://localhost:5173`).
- Add students, view their grades, and manage notes.
- Grades are color-coded and average is shown with promotion status.

## API Endpoints
- **GET /elevi** — List all students
- **POST /elevi** — Add a student
- **DELETE /elevi/:id** — Delete a student (removes their grades too)
- **GET /materii** — List subjects
- **POST /materii** — Add a subject
- **GET /note** — List all grades
- **POST /note** — Add a grade (requires elevId, materieId, valoare)

## Development Notes
- CORS is enabled in the backend for local development.
- All data is stored in SQLite; no external DB required.
- Frontend uses simple in-memory navigation (no react-router).
- For production, consider switching to a persistent DB and adding authentication.

## License
MIT

---

Made by Danut Spafiu