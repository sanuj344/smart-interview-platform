# Smart Interview Platform

A full-stack web application that streamlines interview scheduling, structured feedback collection, and interview analytics using role-based access control.

---

## Overview

The Smart Interview Platform solves the problem of inefficient and manual interview coordination. It provides a centralized system where candidates can book interviews, interviewers can manage availability and submit feedback, and administrators can monitor interview performance through analytics.

---

## Features

### Candidate
- View available interview slots
- Book interviews in real time
- Prevent double booking of interview slots

### Interviewer
- Create and manage availability slots
- View scheduled interviews
- Submit structured interview feedback through a dedicated form
- Prevent feedback resubmission once completed

### Admin
- View overall interview statistics
- Track scheduled and completed interviews
- Analyze average technical and communication scores
- Review recent interview feedback

---

## Technology Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma ORM
- JWT Authentication

### Database
- PostgreSQL (Neon)

### Deployment
- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on Neon (managed PostgreSQL)

---

## Authentication and Authorization

- JWT-based authentication
- Role-based access control (Candidate, Interviewer, Admin)
- Protected routes on both frontend and backend
- Secure authorization middleware

  
---

## Application Flow

1. Interviewer creates availability slots  
2. Candidate books an available slot  
3. Interview appears in interviewer dashboard  
4. Interviewer submits structured feedback  
5. Interview status updates to completed  
6. Admin dashboard reflects updated analytics  

---

## Data Integrity and Safety

- Slot overlap prevention
- One feedback submission per interview
- Server-side validation
- Password hashing using bcrypt
- Secure environment variable usage

---

## Local Setup

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev



