const errorHandlingMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error', message: err.message });
}

module.exports = errorHandlingMiddleware;