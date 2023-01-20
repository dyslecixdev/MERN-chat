const express = require('express');

const router = express.Router();
const {createChat, getOneChat, getAllChats} = require('../controllers/chatController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createChat);
router.get('/:firstId/:secondId', protect, getOneChat);
router.get('/:id', protect, getAllChats);

module.exports = router;
