const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');

// Creates chat between two users.
const createChat = asyncHandler(async (req, res) => {
	const {senderId, receiverId} = req.body;

	const chatExists = await Chat.findOne({senderId, receiverId});
	if (chatExists)
		return res.status(409).json(`Chat between ${senderId} and ${receiverId} already exists`);

	const newChat = await Chat.create({
		users: [senderId, receiverId]
	});

	if (newChat) res.status(201).json(newChat);
	else res.status(400).json('Invalid chat data');
});

// Gets one chat between two users.
const getOneChat = asyncHandler(async (req, res) => {
	const existingChat = await Chat.findOne({
		users: {$in: [req.params.firstId, req.params.secondId]} // $in allows the two user ids to be in any order.
	});
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

	// todo Find a way to protect this route.
	res.status(200).json(existingChat);
});

module.exports = {createChat, getOneChat, getAllChats};
