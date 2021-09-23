const {
  fetchSpecificReview,
  tweakSpecificReview,
  fetchReviews,
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

    if (
      Object.keys(req.body).length !== 1 ||
      req.body.hasOwnProperty("inc_votes") === false
    ) {
      await Promise.reject({ status: 400, msg: "Bad Request" });
    }

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
