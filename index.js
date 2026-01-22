import dotenv from "dotenv";
dotenv.config();
import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import express from "express";
import { v4 as uuidv4 } from 'uuid'; //for unique id
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 8080;

console.log("ENV CHECK →");
console.log("DB_HOST =", process.env.DB_HOST);
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_PASSWORD =", process.env.DB_PASSWORD ? "SET" : "NOT SET");
console.log("DB_NAME =", process.env.DB_NAME);
console.log("DB_PORT =", process.env.DB_PORT);
console.log("PORT =", process.env.PORT);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

//templating or view format he ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//middlewares

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// Create DB connection
let connection;

(async () => {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log("✅ MySQL connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
})();

app.get("/health", (req, res) => {
  res.send("App is running");
});



let getRandomUser = () => {
  return [
    faker.string.uuid(),          // id
    faker.internet.username(),    // username
    faker.internet.email(),       // email
    faker.internet.password(),    // password
    faker.date.birthdate({        // birthdate
      min: 1900,
      max: 2026,
      mode: 'year'
    }).toISOString().split('T')[0] // YYYY-MM-DD
  ];
};

let data=[];
for(let i =1;i<=20;i++){
  //console.log(getRandomUser());
  data.push(getRandomUser());
}


// rout build home
app.get("/", async (req, res) => {
  let q = `SELECT COUNT(*) AS total FROM user`;

  try {
    const [rows] = await connection.query(q);
    // console.log(rows[0]["total"]);
    let totalusers = rows[0].total;
    res.render("index.ejs", { totalusers });
  } catch (err) {
    console.error(err);
    res.send("some error in db");
  }
});

// show all uesrs 
app.get("/user", async (req, res) => {
  let q = `SELECT *  FROM user `;
  let q1 = `SELECT COUNT(*) AS total FROM user`;

  try {
    const [users] = await connection.query(q);
    const [rows] = await connection.query(q1);
    let totalusers = rows[0].total;

    return res.render("show.ejs", { users, totalusers });
  } catch (err) {
    console.error(err);
    return res.send("some error in db");
  }
  // res.send("hello");
});
//add new record
app.get("/user/new", (req, res) => {
  const id = uuidv4();
  res.render("add.ejs", { id });
});

//new record submit
app.post("/user", async (req, res) => {
  const { id, username, email, password, birthdate } = req.body;

  console.log(id, username, email, password, birthdate);

  try {
    await connection.query(
      "INSERT INTO user (id, username, email, password, birthdate) VALUES (?, ?, ?, ?, ?)",
      [id, username, email, password, birthdate]
    );

    res.redirect("/user");
  } catch (err) {
    console.error(err);
    res.send("some error in db");
  }
});

// DELETE USER 
// open delete confirmation page
// open delete confirmation page
app.get("/user/:id/delete", async (req, res) => {
    const { id } = req.params;

    res.render("delete.ejs", { id });
});
//
app.delete("/user/:id", async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        //  get user from DB
        const [rows] = await connection.query(
            "SELECT * FROM user WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.send("User not found");
        }

        const user = rows[0];

        //  verify username & password
        if (username !== user.username || password !== user.password) {
            return res.send("Username or password incorrect");
        }

        //  delete record
        await connection.query(
            "DELETE FROM user WHERE id = ?",
            [id]
        );

        // redirect
        res.redirect("/user");

    } catch (err) {
        console.error(err);
        res.send("some error in db");
    }
});


//EDIT ROUT
app.get("/user/:id/edit", async (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    const [users] = await connection.query(q);
    console.log(users[0]);
    let result = users[0];

    res.render("edit.ejs", { result });
  } catch (err) {
    console.error(err);
    return res.send("some error in db");
  }
});
// edit update rout (db)
app.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { password: formPass, username: newUsername } = req.body;

  try {
    //  Get user
    const [users] = await connection.query(
      "SELECT * FROM user WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      return res.send("User not found");
    }

    const user = users[0];

    //  Password check
    if (formPass !== user.password) {
      return res.redirect("/user");
    } else {

      //  Update username
      await connection.query(
        "UPDATE user SET username = ? WHERE id = ?",
        [newUsername, id]
      );

      //  Redirect after success
      res.redirect("/user");
    }

  } catch (err) {
    console.error(err);
    res.send("some error in db");
  }
});




//server state
app.listen(PORT, () => {
  console.log(`server is lisining at ${PORT}`);
})