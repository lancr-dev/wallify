const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.message === 'FORBIDDEN.') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden.',
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
