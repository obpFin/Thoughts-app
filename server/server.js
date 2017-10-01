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
    date: req.body.date,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send();
  });
});

//GET /thoughts
app.get('/thoughts', (req,res) => {
	Todo.find({
		_creator: req.user._id
	}).then( (thoughts) => {
		res.send({thoughts});
	}, (e) => {
		res.status(400).send();
	});
});