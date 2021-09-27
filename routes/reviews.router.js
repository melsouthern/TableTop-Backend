const express = require("express");
const {
  getSpecificReview,
  patchSpecificReview,
  getReviews,
  getSpecificReviewComments,
  postComment,
  postReview,
} = require("../controllers/reviews.controllers");
const reviews = require("../db/data/test-data/reviews");
const reviewsRouter = express.Router();

reviewsRouter.get("/", getReviews);
reviewsRouter.post("/", postReview);
reviewsRouter.get("/:review_id", getSpecificReview);
reviewsRouter.patch("/:review_id", patchSpecificReview);
reviewsRouter.get("/:review_id/comments", getSpecificReviewComments);
reviewsRouter.post("/:review_id/comments", postComment);

module.exports = reviewsRouter;
