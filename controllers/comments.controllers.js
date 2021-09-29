const {
  removeSpecificComment,
  tweakSpecificComment,
} = require("../models/comments.models");

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

exports.patchSpecificComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;
    const result = await tweakSpecificComment(comment_id, inc_votes);
    res.status(200).send({ comment: result });
  } catch (err) {
    next(err);
  }
};
