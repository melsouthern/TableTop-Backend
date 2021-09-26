const { fetchUsers, fetchSpecificUser } = require("../models/users.models");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await fetchUsers();
    res.status(200).send({ users: result });
  } catch (err) {
    next(err);
  }
};

exports.getSpecificUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const result = await fetchSpecificUser(username);
    res.status(200).send({ user: result });
  } catch (err) {
    next(err);
  }
};
