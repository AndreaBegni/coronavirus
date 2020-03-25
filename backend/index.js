require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 4000;

// middleware setup
app.use(helmet());
app.use(express.json());
app.use(cors());

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("usersDB.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] }).write();

const validateToken = (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(403).json({
      error: "unauthorized"
    });
    return false;
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({
        error: "unauthorized"
      });
      return false;
    }
  });

  return true;
};

//it checks if the authentication token passed in the header is valid
app.get("/test", (req, res) => {
  if (validateToken(req, res))
    res.send({ status: "ok" });
});

//it takes the URI parameter after /users/ as the user's username
//and take the password passed as post parameter
//then it checks if the username exists and compare the two passwords
//if they match it sends back the authentication token with the authenticated flag set as true
//if not the flag is going to be set as false
app.post("/users/:username", async (req, res) => {
  const password = req.body.password;
  const username = req.params.username;

  const user = db
    .get("users")
    .find({ username })
    .value();
  let authenticated = false;
  let token = "";
  if (user !== undefined) {
    authenticated = await bcrypt.compare(password, user.hashedPassword);
    token = jwt.sign({ username }, process.env.SECRET, {
      expiresIn: 86400
    });
  }
  res.send({
    authenticated,
    token
  });
});

//it uses post parameters to create a new user in the database
app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  if (
    db
      .get("users")
      .find({ username: username })
      .size()
      .value() > 0
  ) {
    res.status(400).send({
      error: "user alredy exists"
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = {
    username,
    hashedPassword
  };

  db.get("users")
    .push(newUser)
    .write();

  res.send({success: "user registered"});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
