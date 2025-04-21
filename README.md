

# 🛠️ Project Management API

A RESTful backend API built with **Node.js**, **Express**, and **MySQL**, designed to handle user accounts, projects, tasks, and deadline extension requests — all with robust authentication, role-based access control, and API documentation.

---

## 🚀 Features

- JWT Authentication & Authorization
- Role-based Access Control (Admin, Project Manager, Task Executor)
- Full CRUD for Users, Projects, Tasks, and Extension Requests
- Secure Deadline Extension Workflow with Approval System
- Request Validation using `express-validator`
- Rate Limiting for Public Endpoints
- API Documentation in Markdown and Postman format (...)

---

## 🧰 Tech Stack

- **Node.js**, **Express.js**
- **MySQL**, using `mysql2` for DB access
- **JWT** for Auth
- **bcryptjs** for password hashing
- **dotenv** for environment config
- **Postman** for testing
- **express-validator** for request validation
- **rate-limit** for endpoint protection

---

## 📦 Installation

```bash
git clone https://github.com/Ragheb-work/project_management_app.git

cd project_management_app

npm install
```
---

## Create a .env file :

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=project_db
JWT_SECRET=your_jwt_secret
PORT=5000
```


---

## 🗃️ Database Setup

Create your MySQL database manually or by running the dbInit.js script.

Run migrations to create tables, add indexes.

Seed initial admin user.

✅ See /scripts/dbInit.js for structure setup and /scripts/seed.js for admin seeding.

## 🧪 Running the Server

```bash
npm run dev  # with nodemon
```

---

## 🔐 Authentication

  All protected routes require Authorization: Bearer token header.
  
  Tokens are issued upon login and expire in 2 hours.

---

## 📄 API Documentation

  Full Markdown Docs: docs/api-docs-v2.md
  
  Postman Collection: postman/collection-v2.json

## 📁 Folder Structure
```bash
src/
│
├── config/            # DB and Auth configuration
├── controllers/       # Route logic
├── middleware/        # Auth and validation middleware
├── models/            # Database model logic
├── routes/            # Express route definitions
├── scripts/           # DB init and seeding
├── validators/        # express-validator logic
├── docs/              # Markdown docs and Postman collections
└── index.js           # Server entry point
```
---

## 🧑‍💻 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss.

---

## 📜 License

...

---

## 🤝 Author

Ragheb-work
