const express = require("express");
const apiRouter = require("./routes/api.router");
const app = express();
const {
  notAUserError,
  handleServerError,
  customErrors,
  incorrectDataTypeError,
} = require("./errors/errors");

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL - incorrect path provided" });
});

app.use(notAUserError);
app.use(incorrectDataTypeError);
app.use(customErrors);
app.use(handleServerError);

module.exports = app;
