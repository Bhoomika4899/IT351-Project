const express = require('express');
const { getProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Get User Progress
router.get('/', protect, getProgress);

module.exports = router;
