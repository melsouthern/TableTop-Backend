// extract any functions you are using to manipulate your data, into this file
const db = require("../connection");

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
