# 🔐 Authix – MERN Authentication System

**Authix** is a full-stack authentication system built with the MERN stack. It allows users to register, login, verify their email via OTP, reset password, and stay authenticated using secure cookies.

---

## 🚀 Features

- ✅ User Registration with email & password
- ✅ Email verification using OTP
- ✅ Secure Login with JWT-based authentication (stored in `httpOnly` cookies)
- ✅ Persistent login on page refresh
- ✅ Logout functionality
- ✅ Reset Password via email
- ✅ Context API for global auth state
- ✅ Protected Routes
- ✅ Toast notifications for user feedback
- ✅ Fully responsive frontend with Tailwind CSS

---

## 🛠 Tech Stack

| Tech           | Role               |
|----------------|--------------------|
| React          | Frontend (UI)      |
| Node.js + Express | Backend Server |
| MongoDB        | Database           |
| JWT            | Token-based Auth   |
| Nodemailer     | Sending OTP emails |
| Tailwind CSS   | Styling (UI)       |
| React Toastify | Alerts & Feedback  |
| Axios          | HTTP requests      |
| dotenv         | Environment Config |

---

## 🚀 How to Install & Run

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/authix.git
cd authix

#### 2️⃣ Setup Backend
cd server
npm install
node server.js

#### 2️⃣ Setup Frontend
cd client
npm install
npm run dev


```

