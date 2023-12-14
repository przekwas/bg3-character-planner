const logMiddleware = (req, res, next) => {
	console.log(req.originalUrl);
	next();
}

module.exports = logMiddleware;