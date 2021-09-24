// extract any functions you are using to manipulate your data, into this file
const db = require("../connection");
const { sort } = require("../data/test-data/categories");

exports.formatCategoryDataToNested = (categoryData) => {
  const formattedCategoryData = categoryData.map((category) => {
    return [category.slug, category.description];
  });
  return formattedCategoryData;
};

exports.formatUserDataToNested = (userData) => {
  const formattedUserData = userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
  });
  return formattedUserData;
};

exports.formatReviewDataToNested = (reviewData) => {
  const formattedReviewData = reviewData.map((review) => {
    return [
      review.title,
      review.review_body,
      review.designer,
      review.review_img_url,
      review.votes,
      review.category,
      review.owner,
      review.created_at,
    ];
  });
  return formattedReviewData;
};

exports.formatCommentDataToNested = (commentData) => {
  const formattedCommentData = commentData.map((comment) => {
    return [
      comment.author,
      comment.review_id,
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
  return formattedCommentData;
};

exports.checkReviewIdExists = async (review_id) => {
  const result = await db.query("SELECT * FROM reviews WHERE review_id = $1;", [
    review_id,
  ]);
  if (result.rows.length === 0) {
    return false;
  } else {
    return true;
  }
};

exports.checkReviewIdDataType = (review_id) => {
  const regex = /^\d+$/;
  return regex.test(review_id);
};

exports.checkColumnExists = (sort_by) => {
  if (
    sort_by === "title" ||
    sort_by === "review_id" ||
    sort_by === "review_img_url" ||
    sort_by === "votes" ||
    sort_by === "owner" ||
    sort_by === "category" ||
    sort_by === "created_at" ||
    sort_by === "comment_count"
  ) {
    return true;
  } else {
    return false;
  }
};

exports.checkOrderSpecifier = (order) => {
  const orderCopy = order.toUpperCase();
  if (orderCopy === "DESC" || orderCopy === "ASC") {
    return true;
  } else {
    return false;
  }
};

exports.checkCategoryExists = async (category) => {
  let checkCategory = category.split("_").join(" ");
  result = await db.query(`SELECT reviews.category FROM reviews;`);

  let checker = result.rows.filter((row) => {
    return row.category === checkCategory;
  });

  if (checker.length > 0) {
    return checkCategory;
  } else {
    return false;
  }
};

exports.checkAuthorAndBody = async (author, body) => {};
