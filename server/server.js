const express = require("express");
const app = express();
const port = 5001;
const gamePackRouter = require("./routes/gamepack.router");
const careerRouter = require("./routes/career.router");

//ROUTES
app.use("/gamepack", gamePackRouter);
app.use("/careers", careerRouter);

app.use(express.static("server/public"));

app.listen(port, () => {
  console.log("listening on port:", port);
});
