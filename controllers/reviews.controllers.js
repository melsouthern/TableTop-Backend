const {
  fetchSpecificReview,
  tweakSpecificReview,
  fetchReviews,
  fetchSpecificReviewComments,
  publishComment,
  publishReview,
} = require("../models/reviews.models");

exports.getSpecificReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const result = await fetchSpecificReview(review_id);
    res.status(200).send({ review: result });
  } catch (err) {
    next(err);
  }
};

exports.patchSpecificReview = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { inc_votes } = req.body;
    const result = await tweakSpecificReview(review_id, inc_votes);
    res.status(200).send({ review: result });
  } catch (err) {
    next(err);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { sort_by, order, category } = req.query;
    const result = await fetchReviews(sort_by, order, category);
    res.status(200).send({ reviews: result });
  } catch (err) {
    next(err);
  }
};

exports.getSpecificReviewComments = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const result = await fetchSpecificReviewComments(review_id);
    res.status(200).send({ comments: result });
  } catch (err) {
    next(err);
  }
};

exports.postComment = async (req, res, next) => {
  try {
    const { review_id } = req.params;
    const { username, body } = req.body;
    const result = await publishComment(review_id, username, body);
    res.status(201).send({ comment: result });
  } catch (err) {
    next(err);
  }
};

exports.postReview = async (req, res, next) => {
  try {
    const { owner, title, review_body, designer, category } = req.body;
    const result = await publishReview(
      owner,
      title,
      review_body,
      designer,
      category
    );
    res.status(201).send({ review: result });
  } catch (err) {
    next(err);
  }
};
