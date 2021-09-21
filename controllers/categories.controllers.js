const { fetchCategories } = require("../models/categories.models");

exports.getCategories = async (req, res, next) => {
  try {
    const result = await fetchCategories();
    res.status(200).send({ categories: result });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
