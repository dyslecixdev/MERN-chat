/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Creates a token for the user
const generateToken = userId => {
	return jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

// Registers a user
const registerUser = asyncHandler(async (req, res) => {
	const {username, email, password, confirmPassword, avatar, isAdmin} = req.body;

	const userExists = await User.findOne({email});
	if (userExists) return res.status(409).json('User already exists');

	if (!username || !email || !password || !confirmPassword)
		return res.status(400).json('Username, email, password, and confirm password are required');

	if (password.length < 8 || password.length > 20)
		return res.status(400).json('Password must be between 8 and 20 characters');
	if (password !== confirmPassword)
		return res.status(400).json('Password and confirm password must match');
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		username,
		email,
		password: hashedPassword,
		confirmPassword: hashedPassword,
		avatar,
		isAdmin
	});

	if (newUser) {
		res.status(201).json({
			id: newUser.id,
			username: newUser.username,
			email: newUser.email,
			avatar: newUser.avatar,
			isAdmin: newUser.isAdmin,
			token: generateToken(newUser.id)
		});
	} else res.status(400).json('Invalid user data');
});

// Logs in a user
const loginUser = asyncHandler(async (req, res) => {
	const {username, password} = req.body;

	const existingUser = await User.findOne({username});
	if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
		res.status(200).json({
			id: existingUser.id,
			username: existingUser.username,
			email: existingUser.email,
			avatar: existingUser.avatar,
			isAdmin: existingUser.isAdmin,
			token: generateToken(existingUser.id)
		});
	} else res.status(400).json('Login failed');
});

// Gets one user
const getOneUser = asyncHandler(async (req, res) => {
	const existingUser = await User.findById(req.params.id);
	if (!existingUser) return res.status(404).json('User not found');

	if (req.user.id === req.params.id || req.user.isAdmin)
		res.status(200).json({
			id: existingUser.id,
			username: existingUser.username,
			email: existingUser.email,
			avatar: existingUser.avatar,
			isAdmin: existingUser.isAdmin,
			token: existingUser.token
		});
	else
		res.status(401).json(
			'Only an administrator or the logged in user can get their own information'
		);
});

// Gets all the users
const getAllUsers = asyncHandler(async (req, res) => {
	const {search} = req.query;

	let existingUsers;
	if (search)
		existingUsers = await User.find(
			{_id: {$ne: req.user.id}, username: {$regex: search}}, // Filters the documents by finding all of them with a username of the given search query.
			{username: 1, avatar: 1} // When the documents are sent over to the client, only each user's _id, username, and avatar is shown.
			// Sorts all the documents alphabetically.
		).sort({username: 1});
	else existingUsers = await User.find({_id: {$ne: req.user.id}}, {username: 1, avatar: 1}); // $ne filters out all the documents with the given _id.

	if (!existingUsers) return res.status(404).json('Users not found');

	res.status(200).json(existingUsers);
});

// Updates user
const updateUser = asyncHandler(async (req, res) => {
	const {password, confirmPassword} = req.body;

	const existingUser = await User.findById(req.params.id);
	if (!existingUser) return res.status(404).json('User not found');

	if (password) {
		if (password.length < 8 || password.length > 20)
			return res.status(400).json('Password must be between 8 and 20 characters');
		if (password !== confirmPassword)
			return res.status(400).json('Password and confirm password must match');
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		req.body.password = hashedPassword; // Using password instead of req.body.password will not change the password since it is set using req.body below
		req.body.confirmPassword = hashedPassword;
	}

	let updatedUser;
	try {
		updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	} catch (err) {
		console.log(err.message.white.bgRed);
		res.status(400).json('Invalid updated user data');
	}

	if (req.user.id === req.params.id || req.user.isAdmin)
		res.status(201).json({
			id: updatedUser.id,
			username: updatedUser.username,
			email: updatedUser.email,
			avatar: updatedUser.avatar,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(existingUser.id)
		});
	else res.status(401).json('Only an administrator or the logged in user can update themself');
});

// Deletes user
const deleteUser = asyncHandler(async (req, res) => {
	const existingUser = await User.findById(req.params.id);
	if (!existingUser) return res.status(404).json('User not found');

	if (req.user.id === req.params.id || req.user.isAdmin) {
		await User.findByIdAndDelete(existingUser);
		res.status(200).json('Deleted user');
	} else res.status(401).json('Only an administrator or the logged in user can delete themself');
});

module.exports = {registerUser, loginUser, getOneUser, getAllUsers, updateUser, deleteUser};
