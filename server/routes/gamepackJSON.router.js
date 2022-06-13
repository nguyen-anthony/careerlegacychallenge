const express = require("express");
const gamePackRouter = express.Router();
const gamepacks = require("../gamepack.json");

gamePackRouter.get("/", (req, res) => {
  res.send(gamepacks);
});

module.exports = gamePackRouter;
