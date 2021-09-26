const { removeSpecificComment } = require("../models/comments.models");

exports.deleteSpecificComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const result = await removeSpecificComment(comment_id);
    if (result) {
      res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
};
