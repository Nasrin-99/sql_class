# 📘 SQL Class – User Management System

![Node.js CI](https://github.com/Nasrin-99/sql_class/actions/workflows/node.js.yml/badge.svg)

A **full-stack CRUD web application** built with **Node.js, Express, MySQL, and EJS**, featuring user creation, viewing, editing, deletion (with verification), and a clean UI.

---

## 🚀 Features

* ✅ Add new users
* 👀 View all users
* ✏️ Edit username (password protected)
* ❌ Delete user (username + password verification)
* 📊 Display total users count
* 🎨 Clean & responsive UI (EJS + CSS)
* 🔐 Uses UUID for unique user IDs
* 🧩 Method override for PATCH & DELETE

---

## 🛠 Tech Stack

| Layer        | Technology               |
| ------------ | ------------------------ |
| Backend      | Node.js, Express         |
| Frontend     | EJS, HTML, CSS           |
| Database     | MySQL                    |
| ORM/Driver   | mysql2 (promise)         |
| Utilities    | uuid, faker              |
| HTTP Methods | GET, POST, PATCH, DELETE |

---

## 📁 Project Structure

```
sql_class/
│
├── index.js              # Main server file
├── package.json          # Project metadata & dependencies
├── .gitignore            # Ignored files (node_modules, .env)
│
├── views/                # EJS templates
│   ├── index.ejs         # Home page
│   ├── show.ejs          # Show all users
│   ├── add.ejs           # Add new user
│   ├── edit.ejs          # Edit username
│   └── delete.ejs        # Delete confirmation
│
├── public/
│   └── style.css         # Global styles
│
└── node_modules/         # Dependencies (ignored by Git)
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd sql_class
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create MySQL Database & Table

```sql
CREATE DATABASE collage;
USE collage;

CREATE TABLE user (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(100),
  birthdate DATE
);
```

### 4️⃣ Update Database Credentials

In `index.js`:

```js
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'collage',
  password: 'YOUR_PASSWORD'
});
```

---

## ▶️ Run the Project

```bash
node index.js
```

Server will start at:

```
http://localhost:8080
```

---

## 🔑 Key Backend Concepts (Explained)

### ✅ Express App

```js
const app = express();
```

Creates the Express server.

---

### ✅ View Engine (EJS)

```js
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
```

Allows rendering dynamic HTML pages.

---

### ✅ Middleware

```js
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
```

* Parses form data
* Enables PATCH & DELETE via forms
* Serves CSS files

---
| Package         | Purpose                         |
| --------------- | ------------------------------- |
| express         | Web framework                   |
| ejs             | Template engine                 |
| mysql2          | MySQL database connection       |
| uuid            | Unique ID generation            |
| method-override | Enable PATCH & DELETE           |
| @faker-js/faker | Fake data generation (optional) |
---
npm install express
npm install ejs
npm install mysql2
npm install uuid
npm install method-override
npm install @faker-js/faker
---



### ✅ UUID Generation

```js
const id = uuidv4();
```

Generates a **unique ID** for each user.

---

### ✅ Database Queries

```js
const [rows] = await connection.query(sql);
```

* `rows` contains query results
* Uses async/await (clean & readable)

---

## 🧭 Routes Overview

### 🏠 Home Page

```http
GET /
```

* Shows total user count

---

### 👥 Show All Users

```http
GET /user
```

* Displays all users in table

---

### ➕ Add User

```http
GET /user/new
POST /user
```

* Form to add a new user
* Inserts data into DB

---

### ✏️ Edit User

```http
GET /user/:id/edit
PATCH /user/:id
```

* Update username (password required)

---

### ❌ Delete User (Secure)

```http
GET /user/:id/delete
DELETE /user/:id
```

* Requires username + password
* Prevents accidental deletion

---

## 🎨 Frontend (EJS + CSS)

### ✔ EJS

* Dynamic rendering (`<%= %>`)
* Loops for users list
* Conditional rendering (empty states)

### ✔ CSS

* Reusable buttons (add, edit, delete, back)
* Card-based layout
* Responsive design
* Shared background across pages

---

## 🔐 Security Notes

⚠️ Passwords are stored in **plain text**
✔ OK for learning
❌ NOT recommended for production

👉 Future improvement:

* Use `bcrypt` for password hashing

---

## 🚫 Git Ignore (Important)

`.gitignore`

```gitignore
node_modules/
.env
```

If node_modules was tracked earlier:

```bash
git rm -r --cached node_modules
git commit -m "remove node_modules"
```

---

## 🚀 Future Improvements

* 🔐 Password hashing with bcrypt
* 🔍 Search users by username
* 📄 Pagination
* 🌐 Deployment (Railway / Render)
* 🧪 Input validation & error messages

---

## 👩‍💻 Author

**NASRIN**
Learning Full-Stack Web Development (Node.js + MySQL)

---

## ✅ Final Note

This project demonstrates **real-world CRUD**, not just tutorials.
You’ve covered:

* Backend logic
* Database integration
* RESTful routing
* Server-side rendering
* UI/UX styling


