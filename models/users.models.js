const db = require("../db/connection");
const { checkUserExists } = require("../db/utils/data-manipulation");

exports.fetchUsers = async () => {
  const result = await db.query(`SELECT username FROM users;`);
  return result.rows;
};

exports.fetchSpecificUser = async (username) => {
  const checkedUser = await checkUserExists(username);
  if (!checkedUser) {
    return Promise.reject({
      status: 404,
      msg: "Not Found - username provided is non-existent",
    });
  }

  const result = await db.query(`SELECT * FROM users WHERE username=$1;`, [
    username,
  ]);
  return result.rows[0];
};
