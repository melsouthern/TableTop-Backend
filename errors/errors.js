exports.customErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.notAUserError = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({
      msg: "Not Found - username provided in post request is non-existent",
    });
  } else {
    next(err);
  }
};

exports.incorrectDataTypeError = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({
      msg: "Invalid Data Type - provided input is not an authorised data type",
    });
  } else {
    next(err);
  }
};

exports.handleServerError = (err, req, res, next) => {
  if (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
