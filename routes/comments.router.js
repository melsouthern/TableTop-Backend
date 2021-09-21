const express = require("express");
const commentsRouter = express.Router();

commentsRouter.delete("/:comment_id" /*functionHere*/);
commentsRouter.patch("/:comment_id" /*functionHere*/);

module.exports = commentsRouter;
