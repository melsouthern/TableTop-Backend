const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/" /*functionHere*/);
usersRouter.get("/:username" /*functionHere*/);

module.exports = usersRouter;
