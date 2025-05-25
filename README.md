# 🧩 Lead Management Frontend Application

A modern, responsive lead management frontend built with **Next.js**. It includes a **public lead submission form** for prospects and a secure **admin interface** for internal lead review and management.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Guide](#setup-guide)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [API Routes](#api-routes)
- [System Design](#system-design)
- [Bonus Implementations](#bonus-implementations)
- [Deployment](#deployment)
- [Credentials](#credentials)
---

## 📖 Overview

This application provides:
- A public-facing **lead form** where users can submit job-related information and upload their CV.
- A secure **admin dashboard** to view and manage those leads, including changing lead statuses.
- Basic **mock authentication** for admin access.

---

## 🚀 Features

### 🔓 Public Lead Form

- Fields:
  - First Name, Last Name
  - Email, LinkedIn Profile
  - Visas of Interest (multi-select)
  - Country of Citizenship
  - Resume/CV Upload
  - Additional Info (textarea)
- Client-side validation using `react-hook-form` + `yup`
- Form submission success confirmation

### 🔐 Admin Dashboard

- Secure access using mock login (email/password)
- View all leads and their details
- Update lead status from `PENDING` to `REACHED_OUT`
- Admin-protected routing using `middleware.ts`

---

## 🧪 Tech Stack

| Area            | Tech Used                            |
|-----------------|---------------------------------------|
| Framework       | Next.js (App Router)                  |
| Styling         | CSS Modules + SCSS                    |
| Form Handling   | react-hook-form, yup                  |
| Backend/API     | Next.js API routes + MongoDB          |
| Auth            | Mock auth + Cookies                   |
| File Upload     | FormData + MongoDB (Base64/simulated) |
| Deployment      | Vercel                                |

---

## 🗂 Folder Structure

```
app/
├── api/                # API route handlers
│   └── lead/           # POST, GET, PATCH for leads
├── private/            # Protected internal pages
│   └── admin/dashboard # Lead management UI
├── public/             # Public pages
│   └── lead-form       # Lead submission form
│   └── login           # Admin login
├── shared/             # Reusable components (Input, Button)
├── utils/              # Utility functions/helpers
├── lib/                # MongoDB client setup
├── thankyou/           # Post-submission confirmation
middleware.ts           # Route protection logic
```

---

## ⚙️ Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/lead-management-app.git
cd lead-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file and add your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔐 Authentication

- Admin login is available at:

```
http://localhost:3000/login
```

- **Mock admin credentials:**

```bash
Email:    admin@example.com
Password: admin123
```

- Authentication is managed via cookies and protected using `middleware.ts`.

---

## 📡 API Routes

| Method | Endpoint       | Description                |
|--------|----------------|----------------------------|
| POST   | `/api/lead`    | Submit a new lead          |
| GET    | `/api/lead`    | Fetch all leads            |
| PATCH  | `/api/lead`    | Update lead status         |

---

## 🧱 System Design

- Utilizes **Next.js App Router**
- MongoDB for data storage (lead submissions)
- Stateless form submission using FormData
- Cookie-based session simulation for admin UI
- Protected routes via middleware (based on cookie presence)

---

## 💎 Bonus Implementations

- ✅ API implemented via Next.js API routes
- ✅ Form validation with `react-hook-form` + `yup`
- ✅ Responsive design (mobile-friendly)
- ✅ Type safety with TypeScript
- ✅ Modular component structure (Input, Button, etc.)

---

## 🚀 Deployment

- Deployed using **Vercel** (add your link below):

```
https://your-vercel-deployment-link.vercel.app
```

---

## 🧾 Credentials

**Admin Login**

```
Login URL: http://localhost:3000/login
Email:     admin@example.com
Password:  admin123
```

---
