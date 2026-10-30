# K12 Hunar – EdTech CRM & Inquiry Management System

A full-stack EdTech CRM and Inquiry Management System developed as an internship assignment for K12 Hunar. The application allows parents, students, and schools to submit inquiries through a public form and enables administrators to manage, track, and update inquiries through a secure dashboard.

## 🚀 Live Demo

- **Live Website:** https://k12-edtech-crm-ten.vercel.app/
- **Admin Login:** https://k12-edtech-crm-ten.vercel.app/admin/login
- **Backend API:** https://k12-edtech-crm.onrender.com
- **GitHub Repository:** https://github.com/amarsinhgohil2004-code/k12-edtech-crm

## ✨ Features

### Public Inquiry Form

- Submit inquiries without logging in.
- Select user type: Parent, Student, or School.
- Select inquiry category: Scholarship, Concert, Admission, or General Query.
- Submit name, email, phone number, and message.
- Store submitted inquiries in PostgreSQL.

### Admin Dashboard

- Secure admin login using JWT authentication.
- View and manage submitted inquiries.
- Search inquiries by name or phone number.
- Filter inquiries by category and user type.
- Update inquiry status: Pending, Contacted, or Resolved.
- View inquiry statistics and analytics charts.
- Protected dashboard routes.
- Display the latest inquiries first.

## 🛠️ Technology Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React
- Recharts

### Backend

- Node.js
- Express.js
- PostgreSQL
- Supabase
- JSON Web Token (JWT)
- bcrypt
- Helmet
- CORS

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** Supabase PostgreSQL
- **Version Control:** Git and GitHub

## 📁 Project Structure

```text
k12-edtech-crm/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/
│   │   │   └── inquiry/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vercel.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── scripts/
│   ├── utils/
│   ├── .env.example
│   └── package.json
│
├── schema.sql
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- Supabase account

### 1. Clone the Repository

```bash
git clone https://github.com/amarsinhgohil2004-code/k12-edtech-crm.git

cd k12-edtech-crm
```

### 2. Database Setup

1. Create a new project in Supabase.
2. Open the Supabase SQL Editor.
3. Execute the SQL commands from `schema.sql`.
4. Copy your PostgreSQL connection string.

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`.

Configure the following environment variables:

```env
DATABASE_URL=your_supabase_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secure_jwt_secret

ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

Create the initial admin account:

```bash
node scripts/createAdmin.js
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 4. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file using `.env.example`.

Configure:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## 🔗 API Endpoints

| Method | Endpoint                    | Description            | Access |
| ------ | --------------------------- | ---------------------- | ------ |
| POST   | `/api/inquiries`            | Submit a new inquiry   | Public |
| POST   | `/api/auth/login`           | Admin login            | Public |
| GET    | `/api/inquiries`            | Retrieve all inquiries | Admin  |
| PATCH  | `/api/inquiries/:id/status` | Update inquiry status  | Admin  |
| GET    | `/api/health`               | Check API health       | Public |

## 🔐 Authentication

Admin authentication is implemented using custom JWT-based authentication.

1. Admin submits email and password to `/api/auth/login`.
2. Backend verifies the credentials using bcrypt.
3. On successful authentication, the server generates a JWT token.
4. The token is included in protected API requests.

Example authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

**Note:** Supabase Auth is not used. Authentication is implemented independently using Express.js, bcrypt, and JSON Web Tokens.

## 🛡️ Security

- Passwords are hashed using bcrypt.
- Protected API routes require JWT authentication.
- SQL queries use parameterized statements.
- Sensitive configuration is stored in environment variables.
- Helmet provides additional HTTP security headers.
- CORS is configured to allow requests from the frontend.

## 👨‍💻 Author

**Amarsinh Gohil**

Full Stack Developer | MERN Stack

- **GitHub:** https://github.com/amarsinhgohil2004-code
- **LinkedIn:** https://linkedin.com/in/amarsinh-gohil

---

Developed as part of the K12 Hunar internship assignment.
