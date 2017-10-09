const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Thought} = require('./../../models/thought');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  userName: 'user1',
  email: 'test1@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  userName: 'user2',
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
  _creatorId: userOneId,
  _creatorName: 'testUser1'
}, {
  _id: new ObjectID(),
  text: 'Second test-thought',
  type: 'happy',
  _creatorId: userTwoId,
  _creatorName: 'testUser2'
}];

const populateThoughts = (done) => {
  Thought.remove({}).then(() => {
    return Thought.insertMany(thoughts);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {thoughts, populateThoughts, users, populateUsers};
