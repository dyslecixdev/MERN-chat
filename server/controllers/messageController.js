const asyncHandler = require('express-async-handler');
const Message = require('../models/messageModel');

// Creates message.
const createMessage = asyncHandler(async (req, res) => {
	const {chatId, senderId, receiverId, text, read} = req.body;

	const newMessage = await Message.create({
		chatId,
		senderId,
		receiverId,
		text,
		read
	});

	if (req.user.id === senderId || req.user.id === receiverId || req.user.isAdmin)
		res.status(201).json(newMessage);
	else
		res.status(401).json(
			'Only an administrator or the logged in user can create a message for this chat'
		);
});

// Gets all the messages in a chat.
const getAllMessages = asyncHandler(async (req, res) => {
	const {chatId} = req.params;

	const existingMessage = await Message.find({chatId});
	if (!existingMessage) return res.status(404).json('Message not found');

	if (
		req.user.id === existingMessage[0].senderId ||
		req.user.id === existingMessage[0].receiverId ||
		req.user.isAdmin
	)
		res.status(200).json(existingMessage);
	else
		res.status(401).json(
			"Only an administrator or the logged in user can get this chat's messages"
		);
});

module.exports = {createMessage, getAllMessages};
