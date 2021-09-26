const express = require("express");
const commentsRouter = express.Router();
const {
  deleteSpecificComment,
} = require("../controllers/comments.controllers");

commentsRouter.delete("/:comment_id", deleteSpecificComment);
commentsRouter.patch("/:comment_id" /*functionHere*/);

module.exports = commentsRouter;
