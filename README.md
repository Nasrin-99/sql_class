# 📘 SQL Class – User Management System (ESM)

![Node.js CI](https://github.com/Nasrin-99/sql_class/actions/workflows/node.js.yml/badge.svg)

A **full-stack CRUD web application** built using **Node.js (ES Modules)**, **Express**, **MySQL**, and **EJS**, deployed on **Railway**.  
This project demonstrates real-world backend development with database integration, RESTful routing, and server-side rendering.

---

## 🌍 Live Demo (Railway)
👉 https://sqlclass-production-bd57.up.railway.app/user

---

## 🚀 Features

- ✅ Add new users
- 👀 View all users
- ✏️ Edit username (password protected)
- ❌ Delete user (username + password verification)
- 📊 Display total users count
- 🎨 Clean & responsive UI (EJS + CSS)
- 🔐 UUID-based unique user IDs
- 🧩 Method Override for PATCH & DELETE
- 🧪 Faker.js used for bulk test data

---

## 🛠 Tech Stack

| Layer        | Technology |
|-------------|-----------|
| Runtime     | Node.js (ESM) |
| Backend     | Express.js |
| Frontend   | EJS, HTML, CSS |
| Database   | MySQL (Railway Managed) |
| Driver     | mysql2 (promise) |
| Utilities  | uuid, faker |
| Deployment | Railway |

---

## 📁 Project Structure

```

sql_class/
│
├── index.js              # Main server file (ESM)
├── package.json          # Project metadata & scripts
├── .gitignore            # Ignored files
│
├── views/                # EJS templates
│   ├── index.ejs
│   ├── show.ejs
│   ├── add.ejs
│   ├── edit.ejs
│   └── delete.ejs
│
├── public/
│   └── style.css
│
└── node_modules/         # Dependencies (ignored)

````

---

## ⚙️ Local Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Nasrin-99/sql_class.git
cd sql_class
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create MySQL Database & Table

```sql
CREATE DATABASE collage;
USE collage;

CREATE TABLE user (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(150),
  password VARCHAR(255),
  birthdate DATE
);
```

### 4️⃣ Environment Variables (Local)

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=collage
DB_PORT=3306
PORT=8080
```

---

## ▶️ Run the Project (Local)

```bash
npm start
```

Server runs at:

```
http://localhost:8080
```

---

## 🌐 Deployment (Railway)

* Project deployed using **Railway GitHub integration**
* MySQL added as a Railway database service
* Environment variables configured via Railway dashboard
* Database accessed using **TCP Proxy**
* Public domain generated automatically

---

## 🧠 ES Modules (ESM) Explanation

This project uses **ES Modules** instead of CommonJS.

### Example:

```js
import express from "express";
import mysql from "mysql2/promise";
```

Configured via:

```json
{
  "type": "module"
}
```

---

## 🧭 Routes Overview

### 🏠 Home

```http
GET /
```

Shows total user count.

### 👥 Users

```http
GET /user
```

Displays all users.

### ➕ Add User

```http
GET /user/new
POST /user
```

### ✏️ Edit User

```http
GET /user/:id/edit
PATCH /user/:id
```

### ❌ Delete User (Secure)

```http
GET /user/:id/delete
DELETE /user/:id
```

---

## 🔐 Security Notes

⚠️ Passwords are stored in **plain text** (learning purpose only)

✔️ Recommended improvement:

* Use `bcrypt` for password hashing

---

## 🚫 .gitignore (Important)

```gitignore
node_modules/
.env
```

---

## 🚀 Future Improvements

* 🔐 Password hashing (bcrypt)
* 🔍 Search users
* 📄 Pagination
* ✅ Input validation
* 📊 Admin dashboard

---

## 👩‍💻 Author

**Nasrin**
Learning Full-Stack Web Development (Node.js + MySQL)

---

## ✅ Final Note

This project demonstrates **real-world CRUD application development**:

* Backend logic
* Database integration
* RESTful routing
* ESM-based Node.js
* Production deployment on Railway

## 📢 For Recruiters & Companies

This project showcases my **backend and full-stack development skills** using
**Node.js (ES Modules / ESM)**, **Express**, **MySQL**, and **Railway**.
It focuses on real-world CRUD operations, database integration, and production deployment.

### 🌍 Global Technology Companies
This project is relevant for backend or full-stack roles at organizations such as:
- @google
- @microsoft
- @amazon
- @meta
- @netflix
- @apple

### 🇮🇳 India / Popular Tech Companies
Relevant for backend or platform engineering roles at:
- @flipkart
- @paytm
- @swiggy
- @zomato
- @ola
- @byjus

### 🚀 Developer Platforms & Startups
This project aligns well with developer-focused companies and startups such as:
- @VS_Code
- @railwayapp
- @hashicorp

👥 **Recruiters & Hiring Managers**  
If you’re reviewing this repository:
- Please explore the codebase and commit history
- Check the live deployed version for functionality
- I’d be happy to discuss design choices, improvements, or extensions

📬 **Contact**  
Feel free to reach out via GitHub for feedback, collaboration, or opportunities.

