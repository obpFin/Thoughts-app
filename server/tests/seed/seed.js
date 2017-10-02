const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Thought} = require('./../../models/thought');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'test1@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'test2@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const thoughts = [{
  _id: new ObjectID(),
  text: 'First test-thought',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test-thought',
  type: 'happy',
  _creator: userTwoId
}];

const populateThoughts = (done) => {
  Thought.remove({}).then(() => {
    return Thought.insertMany(thoughts);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {thoughts, populateThoughts, users, populateUsers};
