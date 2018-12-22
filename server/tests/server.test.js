const expect = require('expect');
const request = require('supertest');

const {app} = require('../server.js');
const {Todo} = require('../models/todo.js');
const {User} = require('../models/user.js');

beforeEach((done) => {
  console.log('Remove all docs in todo.');
  Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
  it('should add a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch ((e) => done(err));
      })
  });

  it('should not add todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        
        Todo.find().then((todos) => {
          expect(todos.length).toBe(0);
          done();
        }).catch((e) => done(e));
      });
  });
});

