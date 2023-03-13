module.exports = (err, req, res, next) => {
  console.log("global midelwear runed");
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};
