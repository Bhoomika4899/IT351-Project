const express = require('express');
const { saveGameScore, getGameScores } = require('../controllers/gameController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Save Game Score
router.post('/save', protect, saveGameScore);

// Get Game Scores
router.get('/scores', protect, getGameScores);

module.exports = router;
