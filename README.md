# K12 Hunar - EdTech CRM & Inquiry Management System

A full-stack EdTech CRM application that allows parents, students, and schools to submit inquiries and enables administrators to manage and track them through a secure dashboard.

## Features

### Public Inquiry Form

- Submit inquiries without logging in.
- Select user type: Parent, Student, or School.
- Select category: Scholarship, Concert, Admission, or General Query.
- Enter name, email, phone number, and message.

### Admin Dashboard

- Secure admin login using JWT authentication.
- View all submitted inquiries.
- Search inquiries by name or phone number.
- Filter by category and user type.
- Update inquiry status: Pending, Contacted, or Resolved.
- View inquiry summary statistics.
- Protected dashboard routes.

## Technology Stack

**Frontend**

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

**Backend**

- Node.js
- Express.js
- PostgreSQL
- Supabase
- JWT Authentication
- bcrypt
- Helmet

## Project Structure

```text
k12-edtech-crm/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
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
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/amarsinhgohil2004-code/k12-edtech-crm.git
cd k12-edtech-crm
```

### 2. Database Setup

1. Create a Supabase project.
2. Open the Supabase SQL Editor.
3. Execute the SQL commands from `schema.sql`.
4. Copy your PostgreSQL connection string.

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`.

Configure these variables:

```env
DATABASE_URL=your_supabase_connection_string
PORT=5000
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secure_jwt_secret
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

Create the admin account:

```bash
node scripts/createAdmin.js
```

Start the backend:

```bash
npm run dev
```

Backend URL: `http://localhost:5000`

### 4. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file using `.env.example`.

Configure:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

## API Endpoints

| Method | Endpoint                    | Description           | Access |
| ------ | --------------------------- | --------------------- | ------ |
| POST   | `/api/inquiries`            | Submit inquiry        | Public |
| POST   | `/api/auth/login`           | Admin login           | Public |
| GET    | `/api/inquiries`            | Get all inquiries     | Admin  |
| PATCH  | `/api/inquiries/:id/status` | Update inquiry status | Admin  |
| GET    | `/api/health`               | Check API status      | Public |

### Authentication

Admin authentication uses JWT.

1. Send email and password to `/api/auth/login`.
2. Receive a JWT token.
3. Include the token in protected API requests:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Supabase Auth is not used. Admin authentication is implemented using Express, bcrypt, and JSON Web Tokens.

## Security

- Passwords are hashed using bcrypt.
- Protected APIs require JWT authentication.
- SQL queries use parameterized statements.
- Environment variables store sensitive configuration.
- Helmet provides HTTP security headers.

## Author

**Amarsinh Gohil**

Full Stack Developer | MERN Stack

- GitHub: https://github.com/amarsinhgohil2004-code
- LinkedIn: https://linkedin.com/in/amarsinh-gohil
