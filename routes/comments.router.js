const express = require("express");
const commentsRouter = express.Router();
const {
  deleteSpecificComment,
  patchSpecificComment,
} = require("../controllers/comments.controllers");

commentsRouter
  .route("/:comment_id")
  .delete(deleteSpecificComment)
  .patch(patchSpecificComment);

module.exports = commentsRouter;
