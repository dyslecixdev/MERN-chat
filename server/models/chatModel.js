const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
	{
		users: {
			type: Array
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Chat', chatSchema);
