const db = require("../connection");
const format = require("pg-format");
const {
  formatCategoryDataToNested,
  formatUserDataToNested,
} = require("../utils/data-manipulation");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;

  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);
  await db.query(`DROP TABLE IF EXISTS users;`);

  await db.query(`CREATE TABLE categories (
    slug VARCHAR(50) PRIMARY KEY NOT NULL,
    description TEXT NOT NULL
  );`);

  await db.query(`
  CREATE TABLE users (
    username VARCHAR(150) PRIMARY KEY NOT NULL,
    avatar_url VARCHAR(300) NOT NULL,
    name VARCHAR(150) NOT NULL
  );
`);

  await db.query(`
  CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    review_body VARCHAR(1000) NOT NULL,
    designer VARCHAR(150) NOT NULL,
    review_img_url VARCHAR(1000) DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INT DEFAULT 0,
    category VARCHAR(150) REFERENCES categories(slug),
    owner VARCHAR(150) REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

  await db.query(`
  CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(150) REFERENCES users(username),
    review_id INT REFERENCES reviews(review_id),
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR(200) NOT NULL
  );`);

  const formattedCategoryData = await formatCategoryDataToNested(categoryData);
  const categoryQuery = await format(
    `INSERT INTO categories
    (slug, description)
    VALUES
    %L;`,
    formattedCategoryData
  );
  await db.query(categoryQuery);

  const formattedUserData = await formatUserDataToNested(userData);
  let userQuery = await format(
    `INSERT INTO users
    (username, avatar_url, name)
    VALUES
    %L;`,
    formattedUserData
  );
  await db.query(userQuery);
  console.log(formattedUserData);

  // 1. create tables
  // 2. insert data
};

module.exports = seed;
