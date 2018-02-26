module.exports = function(req, res, next) {
    if (!req.body.title) {
	return res.status(400).send({message : "title must not null"});
    }
    if (!req.body.author) {
	return res.status(400).send({message : "author must not null"});
    }
    if (req.body.title.length > 40) {
	return res.status(400).send({message : "title < 40"});
    }
    if (req.body.author.length > 100) {
	return res.status(400).send({message : "author < 100"});
    }
    next();
}
