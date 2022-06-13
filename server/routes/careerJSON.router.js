const express = require("express");
const careerRouter = express.Router();
const careers = require("../careers.json");

careerRouter.get("/", (req, res) => {
  res.send(careers);
});

module.exports = careerRouter;
