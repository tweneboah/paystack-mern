const notFound = (req, res, next) => {
  const error = new Error(`Route not found ${req.originalUrl}`);

  next(error);
};

const errorMiddlewares = (err, req, res, next) => {
  //set status code
  const errorStatusCode = res.statusCode === 200 ? 500 : res.status.statusCode;
  //set
  res.status(errorStatusCode);
  //send
  res.json({
    message: err.message,
  });
};

export { errorMiddlewares, notFound };
