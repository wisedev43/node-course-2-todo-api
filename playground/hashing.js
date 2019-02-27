const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
// 	console.log('1-salt', salt);
// 	bcrypt.hash(password, salt, (err, hash) => {
// 		console.log('2-salt', salt);
// 		console.log('hash :', hash);
// 	})
// })

var hashedPassword = '$2a$10$UsseiBk3hmlCNbp2IYW6/.U7uU4fosOCq12lnG8Q6UjjU3FA8x54G';

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res);
});

// var data = {
// 	id: 10
// };

// var token = jwt.sign(data, 'abc123');
// console.log(token);

// var decoded = jwt.verify(token, 'abc123');
// console.log('decoded: ', decoded);

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