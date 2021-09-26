const db = require("../db/connection");
const {
  checkIfNum,
  checkCommentIdExists,
} = require("../db/utils/data-manipulation");

exports.removeSpecificComment = async (comment_id) => {
  const checkedDataType = await checkIfNum(comment_id);
  if (!checkedDataType) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Data Type - comment_id provided is not an authorised input",
    });
  }

  const checkedId = await checkCommentIdExists(comment_id);
  if (checkedId) {
    const result = await db.query(
      "DELETE FROM comments WHERE comment_id = $1 RETURNING *;",
      [comment_id]
    );
    return result.rows[0];
  } else {
    return Promise.reject({
      status: 404,
      msg: "Not Found - comment_id provided is non-existent",
    });
  }
};

exports.tweakSpecificComment = async (comment_id, inc_votes) => {
  const checkedDataType = await checkIfNum(comment_id);
  if (!checkedDataType) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Data Type - comment_id provided is not an authorised input",
    });
  }

  const checkedId = await checkCommentIdExists(comment_id);
  if (!checkedId) {
    return Promise.reject({
      status: 404,
      msg: "Not Found - comment_id provided is non-existent",
    });
  }

  const result = await db.query(
    "UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *;",
    [inc_votes, comment_id]
  );
  return result.rows[0];
};
