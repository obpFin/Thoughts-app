const mongoose = require('mongoose');

const thoughtTypes = ['normal','excited','sad','happy','shocked','crazy'];
const Thought = mongoose.model('Thought',{
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
		default: Date.now()
	},
	_creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null
	}
});

module.exports = {Thought};