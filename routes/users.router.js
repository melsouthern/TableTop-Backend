const express = require("express");
const usersRouter = express.Router();
const {
  getUsers,
  getSpecificUser,
} = require("../controllers/users.controllers");

usersRouter.get("/", getUsers);
usersRouter.get("/:username", getSpecificUser);

module.exports = usersRouter;
