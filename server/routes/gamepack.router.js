const { query } = require("express");
const express = require("express");
const gamepackRouter = express.Router();
const pool = require("../modules/pool");

// DB CONNECTION

// GET
gamepackRouter.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "gamepack" ORDER BY "id";';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error getting gamepacks in router.get", err);
      res.sendStatus(500);
    });
});

// POST
gamepackRouter.post("/", (req, res) => {
  let queryText = `INSERT INTO "gamepack" ("id", "name") VALUES ($1, $2)`;
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
// I DONT THINK I NEED THIS

// DELETE
// OR THIS

module.exports = gamepackRouter;
