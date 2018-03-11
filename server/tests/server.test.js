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

describe('POST /users', () => {
  it('should create a user', (done) => {
    let email = 'example@example.com';
    let password = '123asd';
    let userName = 'testUser';

    chai.request(app)
      .post('/users')
      .send({userName,email,password})
      .end((err,res) => {
        if (err) {
          return done(err);
        }

        expect((res) => {
          expect(res).to.have.status(200);
          expect(res.body._id).to.exist;
          expect(res.body.userName).to.exist;
          expect(res.body.email).to.be(email);
        });

        User.findOne({email}).then((user) => {
          expect(user).to.exist;
          expect(user.password).to.not.equal(password);
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

describe('POST /users/login', () => {
  it('should login user and return auth token', (done) => {
    chai.request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.headers['x-auth']).to.exist;
        User.findById(users[1]).then((user) => {
          expect(user.tokens[1]).to.include({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });

  it('should reject invalid login', (done) => {
    chai.request(app)
      .post('/users/login')
      .send({
        email: users[1].email,
        password: 'asd'
      })
      .then((res) => {
        return done(new Error('should have failed with 400'));
      }).catch((e) => {
        expect(e).to.have.status(400);
        User.findById(users[1]).then((user) => {
          expect(user.tokens.length).to.equal(1);
        return done();
        });
      });
  });
});

describe('GET /users', () => {
  it('should get all users', (done) => {
    chai.request(app)
      .get('/users')
      .set('x-auth', users[0].tokens[0].token)
      .end((err,res) => {
        expect(res).to.have.status(200);
          expect(users).to.have.lengthOf(2);
          done();
      });
  });
});

describe('GET users/me', () => {
  it('should return user if authenticated', (done) => {
    chai.request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.userName).to.equal(users[0].userName);
        expect(res.body.email).to.equal(users[0].email);
        done();
      });
  });

  it('should return 401 if not authenticated', (done) => {
    chai.request(app)
      .get('/users/me')
      .end((err,res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.deep.equal({});
        done();
      });
  });
});

describe('POST /thoughts', () => {

  it('should create a new thought', (done) => {
    let thought = {text: 'Test todo text'};

     chai.request(app)
      .post('/thoughts')
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .then((res) => {
        return done(new Error('should have failed with 400'));
      }).catch((e) => {
        expect(e).to.have.status(400);
        return done();
      });
  });
});

describe('GET /thoughts/all', () => {
  it('should get all thoughts', (done) => {
    chai.request(app)
      .get('/thoughts/all')
      .set('x-auth', users[0].tokens[0].token)
      .end((err,res) => {
        expect(res).to.have.status(200);
        Thought.find().then((thoughts) => {
          expect(thoughts).to.have.lengthOf(2);
          done();
        });
      });
  });
});

describe('GET /thoughts/me', () => {
  it('should get all the users thoughts', (done) => {
    chai.request(app)
      .get('/thoughts/me')
      .set('x-auth', users[0].tokens[0].token)
      .end((err,res) => {
        expect(res).to.have.status(200);
        expect(res.body.thoughts).to.have.lengthOf(1);
        done();
      });
  });
});

describe('GET /thoughts/:id',() => {
  it('should return thought',(done) => {
        chai.request(app)
      .get(`/thoughts/${thoughts[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .end((err,res) => {
        expect(res).to.have.status(200);
        expect((res) => {
          expect(res.body.thought.text).to.be(thoughts[0].text);
        });
        done();
      });
  });

  it('should return 404 if thought is not found', (done) => {
    let hexId = new ObjectID().toHexString();

    chai.request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token)
      .end((err,res) => {
        expect(404);
        done();
      });
  });
});

describe('DELETE /thoughts/:id', () => {
  it('should delete thought', (done) => {
    chai.request(app)
      .delete(`/thoughts/${thoughts[0]._id.toHexString()}`)
      .set('x-auth', users[0].tokens[0].token)
      .end((err,res) => {
        expect(res).to.have.status(200);
        Thought.find().then((thoughts) => {
          expect(thoughts).to.have.lengthOf(1);
          done();
        });
      });
  });

  it('should return 404 if thought not found', (done) => {
    var hexId = new ObjectID().toHexString();

    chai.request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[1].tokens[0].token)
      .end((err,res) => {
        expect(res).to.have.status(404);
        done();
      });
      
  });

  it('should return 404 if object id is invalid', (done) => {
    chai.request(app)
      .delete('/thoughts/123')
      .set('x-auth', users[1].tokens[0].token)
      .end((err,res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('PATCH /thoughts/:id', () => {
  it('should update the thought',(done) => {
    var hexId = thoughts[1]._id.toHexString();
    var text = 'new text';

      chai.request(app)
        .patch(`/thoughts/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send({
          text
        })
        .end((err,res) => {
          expect(res).to.have.status(200);
            expect(res.body.thought.text).to.be.a('string');
            expect(res.body.thought.text).to.equal(text);
            done();
        });

  });

  it('should not update the thought created by other user',(done) => {
    var hexId = thoughts[0]._id.toHexString();
    var text = 'new text';

      chai.request(app)
        .patch(`/thoughts/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send({
          text
        })
        .end((err,res) => {
          expect(res).to.have.status(404);
          done();
        });
  });
});

describe('PATCH /users/:id', () => {
  it('should update user',(done) => {
    var hexId = users[1]._id.toHexString();
    var userName = 'username';
    var email = 'email';

      chai.request(app)
        .patch(`/users/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send({
          userName, email
        })
        .end((err,res) => {
          expect(res).to.have.status(200);
            expect(res.body.user.userName).to.be.a('string');
            expect(res.body.user.userName).to.equal(userName);
            expect(res.body.user.email).to.be.a('string');
            expect(res.body.user.email).to.equal(email);
            done();
        });

  });

  it('should not update the thought created by other user',(done) => {
    var hexId = users[0]._id.toHexString();
    var userName = 'username';
    var email = 'email';

      chai.request(app)
        .patch(`/users/${hexId}`)
        .set('x-auth', users[1].tokens[0].token)
        .send({
          userName, email
        })
        .end((err,res) => {
          expect(res).to.have.status(404);
          done();
        });
  });
});