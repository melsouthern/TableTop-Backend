const { fetchPaths } = require("../models/api.models");

exports.getPaths = async (req, res, next) => {
  try {
    const result = await fetchPaths();
    res.status(200).send({ result });
  } catch (err) {
    next(err);
  }
};
