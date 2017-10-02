const {ObjectID} = require('mongodb');
const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));
const {app} = require('./../server');
const {Thought} = require('./../models/thought');
const {User} = require('./../models/user');
const {thoughts, users, populateThoughts, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateThoughts);

describe('POST /thoughts', () => {
  let thought = {text: 'Test todo text'};

  it('should create a new thought', (done) => {
     chai.request(app)
      .post('/thoughts')
      .send(thought)
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;

        Thought.find().then((thoughts) => {
          expect(thoughts).to.have.lengthOf(3);
        });
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('should not create thought with invalid body data', (done) => {
    chai.request(app)
      .post('/thoughts')
      .send({})
      .then((res) => {
        return done(new Error('should have failed with 400'));
      }).catch((e) => {
        expect(e).to.have.status(400);
        return done();
      });
  });
});