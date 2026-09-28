const sendError = (res, statusCode, message, error = null) => {
  if (error) {
    console.error(error);
  }

  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = {
  sendError
};
