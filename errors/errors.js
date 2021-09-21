exports.handleServerError = (err, req, res, next) => {
  if (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};
