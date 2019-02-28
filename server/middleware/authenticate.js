const {User} = require('./../models/user')

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');
	console.log('req.x-auth=', token);

	User.findbyToken(token).then((user) => {
		if (!user) {
			console.log('User not found !!!!')
			return Promise.reject();
		}
		req.user = user;
		req.token = token;
		next();
	}).catch((e) => {
		// console.log('error=', e);
		res.status(401).send();
	});
};

module.exports = {authenticate};
