const express = require("express");
const {
  getSpecificReview,
  patchSpecificReview,
  getReviews,
} = require("../controllers/reviews.controllers");
const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews);
reviewsRouter.get("/:review_id", getSpecificReview);
reviewsRouter.patch("/:review_id", patchSpecificReview);
reviewsRouter.get("/:review_id/comments" /*functionHere*/);
reviewsRouter.post("/:review_id/comments" /*functionHere*/);

module.exports = reviewsRouter;
