# EduConnect — Class Management Platform

A full-stack MERN application that connects students, teachers, and admins on a single platform for seamless class discovery, enrollment, and management.

---

## 🚀 Live Demo
🔗 https://educonnect-ten-ashen.vercel.app

---

## 🎯 What This Project Does

| Role | What They Can Do |
|------|-----------------|
| **Anyone** | Browse classes, view details, pay to enroll |
| **Student** | Join classes, track enrolled courses |
| **Teacher** | Add/manage classes, monitor students |
| **Admin** | Approve classes, manage users, view analytics |

---

## ✨ Key Features

- 🔐 Google Authentication via Firebase
- 👥 Role-based dashboards (Student / Teacher / Admin)
- 💳 Payment integration for class enrollment
- 🤖 Gemini AI assistant for user support
- 📊 Analytics and charts for admins and teachers
- 🌙 Dark / Light theme toggle
- 📱 Fully responsive on all devices

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Auth | Firebase (Google Login) + JWT |
| AI | Gemini AI Chatbot |
| Data Fetching | TanStack Query, Axios |

---

## 🛠️ Run Locally

**Clone the repo**
```bash
git clone https://github.com/Raksharth123/Educonnect.git
cd Educonnect
```

**Frontend setup**
```bash
npm install
npm run dev
```

**Backend setup**
```bash
cd educonnect-server
npm install
node index.js
```

**Environment Variables**

Root `.env`:
```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

`educonnect-server/.env`:
```
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
```

---

## 📁 Project Structure

```
Educonnect/
├── src/                  # React frontend
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── providers/
├── educonnect-server/    # Express backend
│   └── index.js
└── README.md
```

---

## 👨‍💻 Developer

**Raksharth Kohli**
B.Tech CSE | Full-Stack Developer
[GitHub](https://github.com/Raksharth123)
