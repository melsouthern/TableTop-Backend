const db = require("../db/connection");
const {
  checkReviewIdExists,
  checkReviewIdDataType,
  checkColumnExists,
  checkOrderSpecifier,
} = require("../db/utils/data-manipulation");

exports.fetchSpecificReview = async (review_id) => {
  const checkedDataType = await checkReviewIdDataType(review_id);
  if (!checkedDataType) {
    return Promise.reject({ status: 400, msg: "Invalid Data Type" });
  }

  const checkedId = await checkReviewIdExists(review_id);
  if (checkedId) {
    const result = await db.query(
      `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id;`,
      [review_id]
    );

    return result.rows;
  } else {
    return Promise.reject({ status: 404, msg: "Id Not Found" });
  }
};

exports.tweakSpecificReview = async (review_id, inc_votes) => {
  const checkedDataType = await checkReviewIdDataType(review_id);
  if (!checkedDataType) {
    return Promise.reject({ status: 400, msg: "Invalid Data Type" });
  }

  const checkedId = await checkReviewIdExists(review_id);
  if (!checkedId) {
    return Promise.reject({ status: 404, msg: "Id Not Found" });
  }

  const result = await db.query(
    "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
    [inc_votes, review_id]
  );

  return result.rows;
};

exports.fetchReviews = async (sort_by = "created_at", order = "DESC") => {
  const checkedSort = await checkColumnExists(sort_by);
  if (!checkedSort) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  const checkedOrder = await checkOrderSpecifier(order);
  if (!checkedOrder) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  const orderCopy = order.toUpperCase();

  let queryStr = `SELECT reviews.title, reviews.review_id, reviews.review_img_url, reviews.votes, reviews.owner, reviews.category, reviews.created_at, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY ${sort_by} ${orderCopy}`;

  // if (order === "DESC") {
  //   queryStr += " DESC;";
  // }
  // if (order === "ASC") {
  //   queryStr += " ASC;";
  // }

  const result = await db.query(queryStr);
  return result.rows;
  // const result = await db.query(
  //   `SELECT reviews.title, reviews.review_id, reviews.review_img_url, reviews.votes, reviews.owner, reviews.category, reviews.created_at, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY ${sort_by}`
  // );
  // return result.rows;
};
