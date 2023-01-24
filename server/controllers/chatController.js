const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');

// Creates chat between two users.
const createChat = asyncHandler(async (req, res) => {
	const {senderId, receiverId} = req.body;

	// Find in the users array the senderId and receiverId in any order.
	const chatExists = await Chat.findOne({users: {$all: [senderId, receiverId]}});
	if (chatExists)
		return res.status(409).json(`Chat between ${senderId} and ${receiverId} already exists`);

	if (!senderId || !receiverId) return res.status(400).json('Sender ID and Receiver ID required');

	const newChat = await Chat.create({
		users: [senderId, receiverId]
	});

	if (req.user.id === senderId || req.user.id === receiverId || req.user.isAdmin)
		res.status(201).json(newChat);
	else res.status(401).json('Only an administrator or the logged in user can create a chat');
});

// Gets one chat between two users.
const getOneChat = asyncHandler(async (req, res) => {
	const {firstId, secondId} = req.params;

	const existingChat = await Chat.findOne({users: {$all: [firstId, secondId]}});
	if (!existingChat) return res.status(404).json('Chat not found');

	if (
		req.user.id === req.params.firstId ||
		req.user.id === req.params.secondId ||
		req.user.isAdmin
	)
		res.status(200).json(existingChat);
	else res.status(401).json('Only an administrator or the logged in user can their own chat');
});

// Gets all the chats this user is part of.
const getAllChats = asyncHandler(async (req, res) => {
	const existingChat = await Chat.find({
		users: {$in: [req.params.userId]} // $in gets all the Chat documents where req.params.id is one of the elements in its array.
	});
	if (!existingChat) return res.status(404).json('Chat not found');

	if (req.user.id === req.params.userId || req.user.isAdmin) res.status(200).json(existingChat);
	else
		res.status(401).json(
			'Only an administrator or the logged in user can get all of their chats'
		);
});

module.exports = {createChat, getOneChat, getAllChats};
