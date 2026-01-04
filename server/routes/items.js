const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @route   POST /api/items
// @desc    Create a new lost/found item
// @access  Private
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { type, name, category, description, date, place, contact } = req.body;

        const newItem = new Item({
            type,
            name,
            category,
            description,
            date,
            place,
            contact,
            image: req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` : null,
            postedBy: req.user.id
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error creating item' });
    }
});

// @route   GET /api/items
// @desc    Get all items (with filters)
// @access  Public (Protected if user wants to view details? Requirements say "Display all ... after login". So maybe Public or Private. Prompt: "Display all ... after login". So Private or Public but UI blocks it. I'll make it Public for browsing but UI enforces login for full details, OR just make it Private. Prompt says "Prevent access to the application for unauthenticated users". Okay, so Private.)
// WAIT: "Prevent access to the application for unauthenticated users." -> So ALL main routes should be protected.
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { type, category, search } = req.query;
        let query = {};

        if (type) query.type = type;
        if (category) query.category = category;
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const items = await Item.find(query).sort({ createdAt: -1 }).populate('postedBy', 'name email picture');
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching items' });
    }
});

// @route   GET /api/items/my-items
// @desc    Get logged in user's items
// @access  Private
router.get('/my-items', authMiddleware, async (req, res) => {
    try {
        const items = await Item.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error fetching user items' });
    }
});

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check user
        if (item.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this item' });
        }

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error deleting item' });
    }
});

module.exports = router;
