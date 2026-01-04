const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-lost-found')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        // Continue running app even if DB fails, though functionality will be broken
    });

// Routes
const authRoutes = require('./routes/auth');
const itemRoutes = require('./routes/items');

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/messages', require('./routes/messages'));

// Health Check
app.get('/', (req, res) => {
    res.send('College Lost & Found API is running...');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
