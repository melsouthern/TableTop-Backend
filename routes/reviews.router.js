const express = require("express");
const reviewsRouter = express.Router();

reviewsRouter.get("/" /*functionHere*/);
reviewsRouter.get("/:review_id" /*functionHere*/);
reviewsRouter.patch("/:review_id" /*functionHere*/);
reviewsRouter.get("/:review_id/comments" /*functionHere*/);
reviewsRouter.post("/:review_id/comments" /*functionHere*/);

module.exports = reviewsRouter;
