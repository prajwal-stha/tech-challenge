# 📝 Notes App (Fullstack)

A simple notes app built with:

- ✅ **Next.js (App Router)** frontend
- ✅ **Flask** backend using JWT Auth (HttpOnly Cookies)

---

## 📦 Folder Structure

```
notes-auth-app/
├── backend/   # Flask API
└── frontend/  # Next.js app
```

---

## ⚙️ Backend Setup (Flask)

### 1. Go to backend directory

```bash
cd backend
```

### 2. Create virtualenv (optional but recommended)

```bash
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
```

### 3. Install dependencies

```bash
pip install -r  requirements.txt
```

### 4. Run the Flask API

```bash
python app.py
```

- Runs on `http://localhost:5001`
- Uses JWT in HttpOnly cookies
- Includes login/logout + notes CRUD

---

## 🌐 Frontend Setup (Next.js)

### 1. Go to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```


### 3. Create `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/api
```

### 4. Run Next.js app

```bash
npm run dev
```

- Runs on `http://localhost:3000`
- Includes:
  - `/login` page
  - `/notes` dashboard (protected)
  - JWT cookie automatically sent to backend

---

## 🔐 Default Credentials

```
Username: tech
Password: tech_challenge$$$123
```

---
