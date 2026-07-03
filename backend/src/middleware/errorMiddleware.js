const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.message === 'FORBIDDEN.') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden.',
    });
  }

  if (err.message === 'EMAIL_EXISTS') {
    return res.status(409).json({
      success: false,
      message: 'Email already exists.',
    });
  }

  if (err.message === 'INVALID_PASSWORD') {
    return res.status(401).json({
      success: false,
      message: 'Current password is incorrect.',
    });
  }

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
