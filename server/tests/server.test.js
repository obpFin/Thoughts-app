const {ObjectID} = require('mongodb');
const chai = require('chai');
const expect = require('chai').expect;

const {app} = require('./../server');
const {Thought} = require('./../models/thought');
const {User} = require('./../models/user');
const {thoughts, users, populateThoughts, populateUsers} = require('./seed/seed');
chai.use(require('chai-http'));

beforeEach(populateUsers);
beforeEach(populateThoughts);

describe('POST /thoughts', () => {

  it('should create a new thought', (done) => {
    let thought = {text: 'Test todo text'};

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

describe('POST /users', () => {

  it('should create a user', (done) => {
    let email = 'example@example.com';
    let password = '123asd';

    chai.request(app)
      .post('/users')
      .send({email,password})
      .end((err,res) => {
        if (err) {
          return done(err);
        }

        expect((res) => {
        expect(res.body._id).to.exist;
        expect(res.body.email).to.be(email);
        });

        User.findOne({email}).then((user) => {
          expect(user).to.exist;
          //expect(user.password).to.not.be(password);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return validation errors if request is invalid', (done) => {
    let email = '123';
    let password = '1';

    chai.request(app)
      .post('/users')
      .send({email, password})
      .then((res) => {
        return done(new Error('should have failed with 400'));
      }).catch((e) => {
        expect(e).to.have.status(400);
        return done();
      });
  });
});