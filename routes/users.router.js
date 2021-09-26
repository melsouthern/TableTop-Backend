const express = require("express");
const usersRouter = express.Router();
const { getUsers } = require("../controllers/users.controllers");

usersRouter.get("/", getUsers);
usersRouter.get("/:username" /*functionHere*/);

module.exports = usersRouter;
