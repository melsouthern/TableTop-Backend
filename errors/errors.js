exports.customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.notAUserError = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "User Non-Existent" });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  if (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
