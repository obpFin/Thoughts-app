require('./config/config');

const _ = require('lodash');
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Thought} = require('./models/thought');
const {User} = require('./models/user');
const {authenticate} = require('./authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, x-auth, X-Requested-With, Content-Type, Accept");
  next();
});

//POST /thoughts
app.post('/thoughts', authenticate, (req, res) => {
	req.body.text = req.sanitize(req.body.text);
  let thought = new Thought({
    text: req.body.text,
    type: req.body.type,
    date: req.body.date,
    _creatorName: req.user.userName,
    _creatorId: req.user._id
  });

  thought.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /thoughts/all
app.get('/thoughts/all', (req,res) => {
	Thought.find().then((thoughts) => {
		res.send({thoughts});
	}, (e) => {
		res.status(400).send(e);
	});
});

//GET /thoughts
app.get('/thoughts', authenticate, (req,res) => {
	Thought.find({
		_creatorId: req.user._id
	}).then((thoughts) => {
		res.send({thoughts});
	}, (e) => {
		res.status(400).send(e);
	});
});

//GET /thoughts/:id
app.get('/thoughts/:id', authenticate, (req,res) => {
	var id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.sendStatus(404).send();
	}
	Thought.findOne({
		_id: id,
		_creatorId: req.user._id
	}).then( (thought) => {
		if (!thought) {
			res.status(404).send();
		}
		res.send({thought})
	}).catch( (e) => {
		res.status(400).send();
	});
})

//PATCH /thoughts/:id
app.patch('/thoughts/:id', authenticate, (req,res) => {
	req.body.text = req.sanitize(req.body.text);
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'type']);
	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body. completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Thought.findOneAndUpdate({_id: id, _creatorId: req.user._id}, {$set: body}, {new: true}).then((thought) => {
		if (!thought) {
			return res.sendStatus(404);
		}
		res.send({thought});
	}).catch((e) => {
		res.status(400).send();
	});
});

//POST /users
	app.post('/users', (req,res) => {
		let user = new User({
			userName: req.body.userName,
			email: req.body.email,
			password: req.body.password,
		});
	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user)
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//GET /users
app.get('/users',(req,res) => {
	User.find().then((docs) => {
		res.send(docs)
	},(e) => {
		res.status(400).send(e);
	});
});

//DELETE /thoughts:id
app.delete('/thoughts/:id', authenticate, (req,res) => {
	var id = req.params.id;

	if (!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	Thought.findOneAndRemove({
		_id: id,
		_creatorId: req.user._id
	}).then((thought) => {
		if (!thought) {
			res.status(404).send();
		}
		res.send({thought});
	}).catch((e) => {
		res.status(400).send();
	});
});

//GET /users/me
app.get('/users/me', authenticate, (req,res) => {
 	res.send(req.user);
});

//POST /users/login {email, password}
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	
	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			let resp = {user,token}
			res.header('x-auth', token).send(resp);
		});
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.listen(port, () => {
	console.log(`started on port ${port}`);
});

module.exports = {app};