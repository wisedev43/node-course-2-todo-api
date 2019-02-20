const {ObjectID} = require('mongodb');

const {mangoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5c6867141b5fd406418495ce';

// if (!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos)
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo)
// });

// Todo.findById(id).then((todo) => {
// 	if (!todo) {
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo by Id', todo)
// }).catch((e) => console.log(e));

var uid = '5c65d9f5d37c3802d416075e';

if (!ObjectID.isValid(uid)) {
	return console.log('User ObjectID is not valid');
}

User.findById(uid).then((user) => {
	if (!user) {
		return console.log('User not found');
	}
	console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
