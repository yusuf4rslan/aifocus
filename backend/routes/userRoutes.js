const express = require('express');
const router = express.Router();
const { getUserProfile, getUserPosts } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getUserProfile);
router.get('/:id/posts', getUserPosts);

module.exports = router;