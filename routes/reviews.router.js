const express = require("express");
const {
  getSpecificReview,
  patchSpecificReview,
  getReviews,
  getSpecificReviewComments,
  postComment,
  postReview,
} = require("../controllers/reviews.controllers");
const reviewsRouter = express.Router();

reviewsRouter.route("/").get(getReviews);

reviewsRouter
  .route("/:review_id")
  .get(getSpecificReview)
  .patch(patchSpecificReview);

reviewsRouter
  .route("/:review_id/comments")
  .get(getSpecificReviewComments)
  .post(postComment);

module.exports = reviewsRouter;
