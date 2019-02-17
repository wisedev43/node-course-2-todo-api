const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
	id: 10
};

var token = jwt.sign(data, 'abc123');
console.log(token);

var decoded = jwt.verify(token, 'abc123');
console.log('decoded: ', decoded);

// var msg = 'I am user number 3.';
// var hash = SHA256(msg).toString();

// console.log(`Message: ${msg}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'soemsecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'soemsecret').toString();

// if (resultHash === token.hash) {
// 	console.log('Data was not changed.');
// } else {
// 	console.log('Data was changed. Do not trust!');
// }