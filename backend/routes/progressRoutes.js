const express = require('express');
const router = express.Router();

const { getProgressByLetter, getGameProgress } = require('../controllers/progressController');

router.get('/:letter', getProgressByLetter);
router.get("/progress/games", getGameProgress); // New route for game progress
// Update game progress
//router.post("/:gameName", updateGameProgress);

module.exports = router;
