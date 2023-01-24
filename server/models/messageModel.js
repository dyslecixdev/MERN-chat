const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
	{
		chatId: {
			type: String,
			required: true
		},
		senderId: {
			type: String,
			required: true
		},
		receiverId: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
	},
	{timestamps: true}
);

module.exports = mongoose.model('Message', messageSchema);
