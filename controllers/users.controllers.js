const { fetchUsers } = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await fetchUsers();
    res.status(200).send({ users: result });
  } catch (err) {
    next(err);
  }
};
