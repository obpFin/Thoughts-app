require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Thought} = require('./models/thought');
var {User} = require('./models/user');
var {authenticate} = require('./authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

//POST /thoughts
app.post('/thoughts', (req, res) => {
  var thought = new Thought({
    text: req.body.text,
    type: req.body.type,
    date: req.body.date
    //_creator: req.user._id
  });

  thought.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /thoughts
app.get('/thoughts', (req,res) => {
	Thought.find().then((thoughts) => {
		res.send({thoughts});
	}, (e) => {
		res.status(400).send(e);
	});
});

//POST /users
	app.post('/users', (req,res) => {
		var user = new User({
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

app.listen(port, () => {
	console.log(`started on port ${port}`);
});

//GET /users
app.get('/users',(req,res) => {
	User.find().then((docs) => {
		res.send(docs)
	},(e) => {
		res.status(400).send(e);
	});
});

module.exports = {app};