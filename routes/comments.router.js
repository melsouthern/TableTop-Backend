const express = require("express");
const commentsRouter = express.Router();
const {
  deleteSpecificComment,
  patchSpecificComment,
} = require("../controllers/comments.controllers");

commentsRouter.delete("/:comment_id", deleteSpecificComment);
commentsRouter.patch("/:comment_id", patchSpecificComment);

module.exports = commentsRouter;
