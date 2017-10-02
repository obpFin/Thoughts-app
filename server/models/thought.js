const mongoose = require('mongoose');

const thoughtTypes = ['normal','excited','sad','happy','shocked','crazy'];
var Thought = mongoose.model('Thought',{
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	type: {
		type: String,
		enum: thoughtTypes,
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