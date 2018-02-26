module.exports = function(req, res, next) {
    if (req.body.title.length > 40) {
	return res.status(400).send({message : "title < 40"});
    }
    next();
}
