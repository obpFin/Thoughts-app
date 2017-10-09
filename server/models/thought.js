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
	_creatorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		default: null
	},
	_creatorName: {
		type: String,
		required: true,
	}
});

module.exports = {Thought};