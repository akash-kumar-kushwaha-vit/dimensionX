const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Message = require('../models/Message');
const User = require('../models/User');

// @route   POST api/messages
// @desc    Send a message
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { recipientId, content, itemId } = req.body;

        const message = new Message({
            sender: req.user.id,
            recipient: recipientId,
            content,
            itemId
        });

        await message.save();
        res.json(message);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/messages/conversations
// @desc    Get all users the current user has chatted with (Simulated Conversations)
// @access  Private
router.get('/conversations', auth, async (req, res) => {
    try {
        // Find all messages where user is sender or recipient
        const messages = await Message.find({
            $or: [{ sender: req.user.id }, { recipient: req.user.id }]
        })
            .sort({ createdAt: -1 })
            .populate('sender', 'name picture')
            .populate('recipient', 'name picture');

        // Extract unique communication partners
        const conversations = [];
        const seenUsers = new Set();

        messages.forEach(msg => {
            const partner = msg.sender._id.toString() === req.user.id
                ? msg.recipient
                : msg.sender;

            if (!seenUsers.has(partner._id.toString())) {
                seenUsers.add(partner._id.toString());
                conversations.push({
                    partner,
                    lastMessage: msg.content,
                    date: msg.createdAt,
                    read: msg.read
                });
            }
        });

        res.json(conversations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/messages/:userId
// @desc    Get chat history with a specific user
// @access  Private
router.get('/:userId', auth, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, recipient: req.params.userId },
                { sender: req.params.userId, recipient: req.user.id }
            ]
        }).sort({ createdAt: 1 }); // Oldest first for chat history flow

        res.json(messages);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
