const db = require("../db/connection");
const users = require("../db/data/test-data/users");

exports.fetchUsers = async () => {
  const result = await db.query(`SELECT username FROM users;`);
  return result.rows;
};
