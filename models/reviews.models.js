const db = require("../db/connection");
const {
  checkReviewIdExists,
  checkColumnExists,
  checkOrderSpecifier,
  checkCategoryExists,
} = require("../db/utils/data-manipulation");

exports.fetchSpecificReview = async (review_id) => {
  const checkedId = await checkReviewIdExists(review_id);
  if (checkedId) {
    const result = await db.query(
      `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id;`,
      [review_id]
    );
    return result.rows[0];
  } else {
    return Promise.reject({
      status: 404,
      msg: "Not Found - review_id provided is non-existent",
    });
  }
};

exports.tweakSpecificReview = async (review_id, inc_votes) => {
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request - inc_votes has not been provided",
    });
  }

  const checkedId = await checkReviewIdExists(review_id);
  if (!checkedId) {
    return Promise.reject({
      status: 404,
      msg: "Not Found - review_id provided is non-existent",
    });
  }

  const result = await db.query(
    "UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;",
    [inc_votes, review_id]
  );

  return result.rows[0];
};

exports.fetchReviews = async (
  sort_by = "created_at",
  order = "DESC",
  category
) => {
  const checkedSort = checkColumnExists(sort_by);
  if (!checkedSort) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request - sort_by statement is provided incorrectly",
    });
  }

  const checkedOrder = checkOrderSpecifier(order);
  if (!checkedOrder) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request - order statement is provided incorrectly",
    });
  }

  const orderCopy = order.toUpperCase();

  if (category) {
    const checkedCategory = await checkCategoryExists(category);
    if (!checkedCategory) {
      return Promise.reject({
        status: 400,
        msg: "Not Found - category provided is non-existent",
      });
    }

    const checkedEmptyReviews = await db.query(
      `SELECT * FROM reviews WHERE category=$1;`,
      [checkedCategory]
    );
    if (checkedEmptyReviews.rows.length === 0) {
      return [];
    }

    let queryStr = `SELECT reviews.title, reviews.review_id, reviews.review_img_url, reviews.votes, reviews.owner, reviews.category, reviews.created_at, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE category='${checkedCategory}' GROUP BY reviews.review_id ORDER BY ${sort_by} ${orderCopy}`;
    const result = await db.query(queryStr);
    return result.rows;
  } else {
    let queryStr = `SELECT reviews.title, reviews.review_id, reviews.review_img_url, reviews.votes, reviews.owner, reviews.category, reviews.created_at, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id ORDER BY ${sort_by} ${orderCopy}`;

    const result = await db.query(queryStr);
    return result.rows;
  }
};

exports.fetchSpecificReviewComments = async (review_id) => {
  const checkedId = await checkReviewIdExists(review_id);
  if (checkedId) {
    const result = await db.query(
      `SELECT comment_id, votes, created_at, author, body FROM comments WHERE review_id=$1;`,
      [review_id]
    );
    return result.rows;
  } else {
    return Promise.reject({
      status: 404,
      msg: "Not Found - review_id provided is non-existent",
    });
  }
};

exports.publishComment = async (review_id, username, body) => {
  if (!username || !body) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request - required field (username or body) has not been provided",
    });
  }

  const checkedId = await checkReviewIdExists(review_id);
  if (!checkedId) {
    return Promise.reject({
      status: 404,
      msg: "Not Found - review_id provided is non-existent",
    });
  }

  const result = await db.query(
    `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3) RETURNING comment_id, votes, created_at, author, body;`,
    [review_id, username, body]
  );

  return result.rows[0];
};
