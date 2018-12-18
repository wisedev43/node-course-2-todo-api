// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

// MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, db) => {
MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
    if (err) {
    return console.log('Unable to connect MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do #2',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todos.', err);
  //   }

  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // db.collection('Users').insertOne({
  //   name: 'Andrew',
  //   age: 25,
  //   location: 'Philadelphia'
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('Unable to insert Users.', err);
  //   }

  //   console.log(res.ops);
  // });


  client.close();
});