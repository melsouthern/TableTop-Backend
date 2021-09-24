const express = require("express");
const {
  getSpecificReview,
  patchSpecificReview,
  getReviews,
  getSpecificReviewComments,
  postComment,
} = require("../controllers/reviews.controllers");
const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews);
reviewsRouter.get("/:review_id", getSpecificReview);
reviewsRouter.patch("/:review_id", patchSpecificReview);
reviewsRouter.get("/:review_id/comments", getSpecificReviewComments);
reviewsRouter.post("/:review_id/comments", postComment);

module.exports = reviewsRouter;
