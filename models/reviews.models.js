const db = require("../db/connection");
const {
  checkReviewIdExists,
  checkReviewIdDataType,
} = require("../db/utils/data-manipulation");

exports.fetchSpecificReview = async (review_id) => {
  const checkedDataType = await checkReviewIdDataType(review_id);
  if (!checkedDataType) {
    return Promise.reject({ status: 400, msg: "Invalid Data Type" });
  }

  const checkedId = await checkReviewIdExists(review_id);
  if (checkedId) {
    const result = await db.query(
      "SELECT * FROM reviews WHERE review_id = $1;",
      [review_id]
    );

    const commentCount = await db.query(
      "SELECT COUNT(review_id) FROM comments WHERE review_id = $1;",
      [review_id]
    );

    result.rows[0].comment_count = commentCount.rows[0].count;
    return result.rows[0];
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

  const result = await db.query("SELECT * FROM reviews WHERE review_id = $1;", [
    review_id,
  ]);

  const commentCount = await db.query(
    "SELECT COUNT(review_id) FROM comments WHERE review_id = $1;",
    [review_id]
  );

  result.rows[0].comment_count = commentCount.rows[0].count;
  result.rows[0].votes += inc_votes;
  return result.rows[0];
};
