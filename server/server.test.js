const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Thought} = require('./../models/thought');
const {User} = require('./../models/user');
//const {thoughts, users, populateTodos, populateUsers} = require('./seed/seed');

// beforeEach(populateUsers);
// beforeEach(populateTodos);

describe('POST /thoughts', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    // request(app)
    //   .post('/thoughts')
    //   // .set('x-auth', users[0].tokens[0].token)
    //   .send({text})
    //   .expect(200)
    //   .expect((res) => {
    //     expect(res.body.text).toBe(text);
    //   })
    //   .end((err, res) => {
    //     if (err) {
    //       return done(err);
    //     }

    //     Thought.find({text}).then((thoughts) => {
    //       expect(todos.length).toBe(1);
    //       expect(todos[0].text).toBe(text);
    //       done();
    //     }).catch((e) => done(e));
  });
});