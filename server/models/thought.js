var mongoose = require('mongoose');

var Thought = mongoose.model('Thought',{
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	type: {
		text: String,
		default: 'normal'
	},
	date: {
		type: Date,
		default: null
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

module.exports = {Thought};