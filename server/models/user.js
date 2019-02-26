const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

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

var User = mongoose.model('User', UserSchema);


module.exports = {User};
