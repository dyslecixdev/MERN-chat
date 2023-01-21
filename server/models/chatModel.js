const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
	{
		users: {
			type: Array,
			required: true
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Chat', chatSchema);
