🎯 Smart Interview Platform

A full-stack interview scheduling and feedback platform that enables candidates to book interviews, interviewers to manage availability and submit structured feedback, and admins to view analytics — all in one system.

🚀 What Problem Does This Solve?

Interview coordination is often manual, fragmented, and inefficient.

This platform solves:

❌ Back-and-forth scheduling emails

❌ No structured feedback system

❌ Poor visibility into interview performance

By providing:

Centralized scheduling

Role-based dashboards

Structured feedback & analytics

🧠 Core Features
👤 Candidate

View available interview slots

Book interviews in real time

Prevent double booking

🎤 Interviewer

Create and manage availability slots

View assigned interviews

Submit structured feedback via a dedicated form

Feedback cannot be resubmitted once completed

🛠 Admin

View interview statistics

Track completed vs scheduled interviews

Analyze average technical & communication scores

View recent interview feedback

🧱 Tech Stack
Frontend

React (Vite)

React Router

Axios

Tailwind CSS

Backend

Node.js

Express.js

Prisma ORM

JWT Authentication

Database

PostgreSQL (Neon)

Deployment

Frontend: Vercel

Backend: Render

Database: Neon (Managed PostgreSQL)

🔐 Authentication & Authorization

JWT-based authentication

Role-based access control

CANDIDATE

INTERVIEWER

ADMIN

Protected routes on frontend and backend

🗂 Project Structure (Simplified)
frontend/
 ├── auth/
 ├── pages/
 │   ├── candidate/
 │   ├── interviewer/
 │   └── admin/
 ├── layouts/
 └── api/

backend/
 ├── controllers/
 ├── routes/
 ├── middleware/
 ├── prisma/
 └── server.js

⚙️ Key Design Decisions

Environment variables for DB and secrets (no hardcoding)

Prisma migrations for safe schema changes

Dedicated feedback form instead of browser prompts

Single shared database across environments

Centralized layout management for scalability

🧪 Sample Workflow

Interviewer creates time slots

Candidate books an available slot

Interview appears in interviewer dashboard

Interviewer submits feedback

Interview status becomes COMPLETED

Admin dashboard updates analytics automatically

🛡 Data Integrity & Safety

Slot overlap prevention

One interview → one feedback submission

Validation on both frontend & backend

Secure password hashing using bcrypt
