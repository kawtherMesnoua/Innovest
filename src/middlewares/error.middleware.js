function notFoundHandler(req, res, next) {
  res.status(404).json({ message: 'Not Found' });
}

function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = { notFoundHandler, errorHandler };


