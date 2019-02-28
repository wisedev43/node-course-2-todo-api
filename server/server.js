require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {ObjectID} = require('mongodb');

var {mangoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => { 
  var todo = new Todo({
    text: req.body.text
  })
  
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	})
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.status(200).send({todo});
	}).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
	// get id
	var id = req.params.id

	// Validate Id -> not valid? return 404
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	//remove todo by id
	Todo.findByIdAndRemove(id).then((todo) => {
		// success
		if (!todo) {
			// if no doc, send back 404
			return res.status(404).send();
		} else {
			// if doc, send the doc with 200
			res.status(200).send({todo})
		}
	}).catch((e) => {
		// error
				// 400 with empty body
		res.status(400).send();
	})
});

app.patch('/todos/:id', (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	//console.log('completed is ', _.isBoolean(body.completed), body.completed);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}
		res.status(200).send({todo: todo});
	}).catch((e) => {
		res.status(400).send();
	})

});

app.get('/users', (req, res) => {
	User.find().then((users) => {
		res.send({users});
	}, (e) => {
		res.status(400).send(e);
	})
});

app.post('/users', (req, res)=>{
	var body = _.pick(req.body, ['email', 'password']);
	var user = new User(body);

	// console.log('BODY', body);
	// console.log('USER', user);

	user.save().then(() => {
		console.log('generation AuthToken....')
		var obj = user.generateAuthToken();
		// console.log('obj=', obj);
		return obj;
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((e) => {
		console.log(e);
		res.status(400).send(e);
	})
});

// app.get('/users/me', (req, res) => {
// 	var token = req.header('x-auth');
// 	User.findbyToken(token).then((user) => {
// 		if (!user) {
// 			Promise.reject();
// 		}
// 		res.status(200).send(user);
// 	}).catch((e) => {
// 		res.status(401).send();
// 	});
// });

app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findbyCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		})
	}).catch((e) => {
		res.status(400).send();
	});
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
