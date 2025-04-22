# 📘 Project Management API Documentation (v2.0)

## 🔐 Authentication

### POST /api/auth/register

- **Description:** Register a new user (admin-only access)
- **Headers:** `Authorization: Bearer <admin_token>`
- **Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword"
}
```

- **Response:** 201 Created

### POST /api/auth/login

- **Description:** Authenticate user and receive JWT
- **Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword"
}
```

- **Response:**

```json
{
  "token": "<jwt_token>"
}
```

---

## 👤 Users

### GET /api/users/:id

- **Description:** Get user by ID (admin-only access)
- **Headers:** `Authorization: Bearer <admin_token>`

### GET /api/users

- **Description:** List all users (admin-only)
- **Headers:** `Authorization: Bearer <admin_token>`

### PUT /api/users/:id

- **Description:** Update user by ID (admin-only)
- **Headers:** `Authorization: Bearer <admin_token>`

### DELETE /api/users/:id

- **Description:** Delete user by ID (admin-only)
- **Headers:** `Authorization: Bearer <admin_token>`

---

## 📁 Projects

### POST /api/projects

- **Description:** Create a new project (authenticated users only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "reference": "PRJ001",
  "name": "New Project",
  "description": "Some description",
  "start_date": "2025-04-21",
  "end_date": "2025-05-21",
  "monitor_id": 3
}
```

### GET /api/projects/:id

- **Description:** Get project by ID
- **Headers:** `Authorization: Bearer <token>`

### GET /api/projects

- **Description:** List all projects
- **Headers:** `Authorization: Bearer <token>`

### PUT /api/projects/:id

- **Description:** Update project (manager-only)
- **Headers:** `Authorization: Bearer <token>`

### DELETE /api/projects/:id

- **Description:** Delete project (manager-only)
- **Headers:** `Authorization: Bearer <token>`

---

## ✅ Tasks

### POST /api/tasks

- **Description:** Create a new task (authenticated users only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "project_id": 1,
  "description": "Task A",
  "executor_id": 2,
  "start_date": "2025-04-21",
  "initial_deadline": "2025-05-10"
}
```

### GET /api/tasks/:id

- **Description:** Get task by ID
- **Headers:** `Authorization: Bearer <token>`

### GET /api/tasks

- **Description:** List all tasks
- **Headers:** `Authorization: Bearer <token>`

### PUT /api/tasks/:id

- **Description:** Update task (manager-only)
- **Headers:** `Authorization: Bearer <token>`

### DELETE /api/tasks/:id

- **Description:** Delete task (manager-only)
- **Headers:** `Authorization: Bearer <token>`

---

## ⏳ Extension Requests

### POST /api/extensions

- **Description:** Request deadline extension (executor-only)
- **Headers:** `Authorization: Bearer <token>`
- **Body:**

```json
{
  "task_id": 5,
  "requested_deadline": "2025-05-20",
  "reason": "Need more time due to unforeseen issues."
}
```

### GET /api/extensions/:id

- **Description:** Get extension request by ID
- **Headers:** `Authorization: Bearer <token>`

### GET /api/extensions/user/:userId

- **Description:** List all extension requests made by a user
- **Headers:** `Authorization: Bearer <token>`

### PUT /api/extensions/:id/approve

- **Description:** Approve extension request (manager/admin only)
- **Headers:** `Authorization: Bearer <token>`

### PUT /api/extensions/:id/reject

- **Description:** Reject extension request (manager/admin only)
- **Headers:** `Authorization: Bearer <token>`

---

## 🛡️ Security & Validation

- JWT-based Auth (`Authorization: Bearer <token>`) required on all protected routes.
- All inputs are validated using `express-validator`.
- Rate limiting is applied to sensitive routes.

---

## 📦 Postman Collection

Find the exported Postman collection in the `/docs/postman` directory:

- **[Postman Collection v2.1](./postman/collection-v2.json)**

---

## 📌 Notes

- `manager_id` is automatically set to the authenticated user creating the project.
- Only project managers can modify or delete their projects or associated tasks.
- Notifications (e.g., console/logs) are sent upon extension request approval.

---

For full setup instructions and usage, refer to the [README.md](../README.md) file.
