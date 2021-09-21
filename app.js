const express = require("express");
const apiRouter = require("./routes/api.router");
const app = express();
const { handleServerError } = require("./errors/errors");

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handleServerError);

module.exports = app;
