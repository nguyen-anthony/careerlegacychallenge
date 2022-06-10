const express = require("express");
const careerRouter = express.Router();
const pool = require("../modules/pool");

// DB CONNECTION

// GET
careerRouter.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "careers" ORDER BY "id";';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error getting careers in router.get", err);
      res.sendStatus(500);
    });
});

// POST
careerRouter.post("/", (req, res) => {
  let queryText = `INSERT INTO "careers" ("id", "name", "gamepack_id") VALUES ($1, $2, $3)`;
  pool
    .query(queryText)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

// PUT

// DELETE

module.exports = careerRouter;
