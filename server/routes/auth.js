const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ALLOWED_DOMAINS = (process.env.ALLOWED_DOMAINS || 'gmail.com,college.edu').split(',');

router.post('/google', async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ message: 'Google credential is required' });
    }

    try {
        // Verify Google Token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();

        const { sub: googleId, email, name, picture, hd } = payload;

        // Domain Validation
        const emailDomain = email.split('@')[1];
        // Check if domain is allowed. 'hd' validation is also good but email check is explicit.
        if (!ALLOWED_DOMAINS.includes(emailDomain)) {
            return res.status(403).json({ message: `Access denied. Please use an email from: ${ALLOWED_DOMAINS.join(', ')}` });
        }

        // Find or Create User
        let user = await User.findOne({ googleId });
        if (!user) {
            user = await User.create({
                name,
                email,
                googleId,
                picture
            });
        }

        // Generate Application JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: 'Authentication successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });

    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
});

module.exports = router;
