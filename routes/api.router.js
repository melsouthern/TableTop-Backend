const express = require("express");
const apiRouter = express.Router();
const categoriesRouter = require("./categories.router");
const reviewsRouter = require("./reviews.router");
const commentsRouter = require("./comments.router");
const usersRouter = require("./users.router");

apiRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "Connected to API!" });
});

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
