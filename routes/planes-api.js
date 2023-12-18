const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// import all database queries related functions. e.g. getAllPlanes
const database = require("../db/database");

router.get("/", (req, res) => {
  database
    .getAllPlanes(req.query, 10)
    .then((planes) => res.send({ planes }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;
