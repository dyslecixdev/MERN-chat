const express = require('express');

const router = express.Router();
const {createMessage, getAllMessages} = require('../controllers/messageController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createMessage);
router.get('/:chatId', protect, getAllMessages);

module.exports = router;
