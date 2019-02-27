const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email : {
    type: String,
    require: true,
    trim: true,
		minlength: 1,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not valid email.'
		}
	},
	
	password: {
		type: String,
		require: true,
		minlength: 6
	},

	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();

	// console.log('Picking userObject...')
	return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
	var user = this;
	var access = 'auth';
	var token = jwt.sign({id: user._id.toHexString(), access}, 'abc123').toString();

	// console.log('1-token', token);
	user.tokens = user.tokens.concat([{access, token}]);
	// console.log('2-user.tokens', user.tokens);
	// console.log('3-user.tokens.token', user.tokens[0].token);

	return user.save().then((token) => {
		return token;
	})
}

UserSchema.statics.findbyToken = function(token) {
	var User = this;
	var decoded;

	try {
		console.log('Starting to decode.....');
		decoded = jwt.verify(token, 'abc123');
		console.log('decoded **** \n', decoded);
	} catch (e) {
		// return new Promise((resolve, reject) => {
		// 	reject();
		// });
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded.id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
}

UserSchema.pre('save', function(next) {
	var user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			})
		});
	} else {
		next();
	}
});

var User = mongoose.model('User', UserSchema);


module.exports = {User};
