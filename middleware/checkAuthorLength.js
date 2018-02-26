module.exports = function(req, res, next) {
    if (req.body.author.length > 100) {
	return res.status(400).send({message : "author < 100"});
    }
    next();
}
