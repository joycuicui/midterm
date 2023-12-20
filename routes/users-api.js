/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
// const userQueries = require('../db/queries/users');
const database = require("../db/database");

///////////////////////////////////////////////////////////////////////////////
/// Return information about the current user (based on cookie value)
///////////////////////////////////////////////////////////////////////////////
router.get("/me", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "not logged in" });
  }
  database
    .getUserWithId(userId)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with this id" });
      }
      res.send({
        name: user.name,
        email: user.email,
        id: userId,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

///////////////////////////////////////////////////////////////////////////////
/// Create a new user
///////////////////////////////////////////////////////////////////////////////
router.post("/", (req, res) => {
  const user = req.body;
  database
    .addUser(user)
    .then((user) => {
      if (!user) {
        return res.send({ error: "error" });
      }
      req.session.userId = user.id;
      res.send("adding new user successful 🤗");
    })
    .catch((e) => res.send(e));
});

///////////////////////////////////////////////////////////////////////////////
/// Log a user in
///////////////////////////////////////////////////////////////////////////////
router.post("/login", (req, res) => {
  console.log("req.body:", req.body);
  const email = req.body["login-email"];
  console.log("email entered for log in in post request is:", email);
  const password = req.body["login-password"];
  database.getUserWithEmail(email).then((user) => {
    console.log("user retrieved from getUserWithEmail is:", user);
    if (!user) {
      return res.send({ error: "no user with this email" });
    }
    if (password !== user.password) {
      return res.send({ error: "wrong password" });
    }
    req.session.userId = user.id;
    res.send({
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    });
  });
});

///////////////////////////////////////////////////////////////////////////////
/// Log a user out
///////////////////////////////////////////////////////////////////////////////
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.send({});
});

module.exports = router;
