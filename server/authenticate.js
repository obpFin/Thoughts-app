var {User} = require('./models/user');

var authenticate = (req,res,next) => {
		var token = req.header('x-auth');

		User.findByToken(token).then((user) => {
			if (!user) {
				console.log('user not found');
				return Promise.reject();
			}

			req.user = user;
			req.token = token;
			next();
		}).catch((e) => {
			console.log('authentication error');
			res.status(401).send();
		});
};

module.exports = {authenticate};