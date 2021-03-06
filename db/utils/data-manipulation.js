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
  return result.rows.length !== 0;
};

exports.checkColumnExists = (sort_by) => {
  return (
    sort_by === "title" ||
    sort_by === "review_id" ||
    sort_by === "review_img_url" ||
    sort_by === "votes" ||
    sort_by === "owner" ||
    sort_by === "category" ||
    sort_by === "created_at" ||
    sort_by === "comment_count"
  );
};

exports.checkOrderSpecifier = (order) => {
  if (typeof order === "string" || order instanceof String) {
    const orderCopy = order.toUpperCase();
    return orderCopy === "DESC" || orderCopy === "ASC";
  } else {
    return false;
  }
};

exports.checkCategoryExists = async (category) => {
  if (typeof category !== "string") {
    return false;
  }
  const checkCategory = category.split("_").join(" ");
  const result = await db.query(`SELECT categories.slug FROM categories;`);
  const checker = result.rows.filter((row) => {
    return row.slug === checkCategory;
  });

  if (checker.length > 0) {
    return checkCategory;
  }
  return false;
};

exports.checkCommentIdExists = async (comment_id) => {
  const result = await db.query(
    "SELECT * FROM comments WHERE comment_id = $1;",
    [comment_id]
  );
  return result.rows.length !== 0;
};

exports.checkUserExists = async (user) => {
  if (typeof user !== "string") {
    return false;
  }
  const result = await db.query(`SELECT username FROM users;`);
  const checker = result.rows.filter((row) => {
    return row.username === user;
  });

  if (checker.length > 0) {
    return true;
  }
  return false;
};
