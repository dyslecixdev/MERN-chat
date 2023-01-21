const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');

// Creates message.
const createMessage = asyncHandler(async (req, res) => {
	const {chatId, senderId, text} = req.body;

	const newMessage = await Message.create({
		chatId,
		senderId,
		text
	});

	if (newMessage) res.status(201).json(newMessage);
	else res.status(400).json('Invalid message data');
});

// Gets all the messages in a chat.
const getAllMessages = asyncHandler(async (req, res) => {
	const {chatId} = req.params;

	const existingMessage = await Message.find({chatId});
	if (!existingMessage) return res.status(404).json('Message not found');

	// todo Find a way to protect this route.
	res.status(200).json(existingMessage);
});

module.exports = {createMessage, getAllMessages};
