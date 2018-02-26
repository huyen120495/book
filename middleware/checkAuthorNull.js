module.exports = function(req, res, next) {
    if (!req.body.author) {
	return res.status(400).send({message : "author must not null"});
    }
    next();
}
