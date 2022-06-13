const express = require("express");
const app = express();
const port = process.env.PORT || 5001;
// const gamePackRouter = require("./routes/gamepack.router");
// const careerRouter = require("./routes/career.router");
const careerRouter = require("./routes/careerJSON.router");
const gamePackRouter = require("./routes/gamepackJSON.router");

//ROUTES
app.use("/gamepack", gamePackRouter);
app.use("/careers", careerRouter);

app.use(express.static("server/public"));

app.listen(port, () => {
  console.log("listening on port:", port);
});
