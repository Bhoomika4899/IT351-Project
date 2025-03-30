const GameScore = require('../models/GameScore');

// Save Game Score
const saveGameScore = async (req, res) => {
  const { game_name, score, correct_attempts, wrong_attempts } = req.body;

  try {
    const gameScore = await GameScore.create({
      user_id: req.user.id,
      game_name,
      score,
      correct_attempts,
      wrong_attempts,
    });

    res.status(201).json(gameScore);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save game score' });
  }
};

// Get Game Scores
const getGameScores = async (req, res) => {
  try {
    const scores = await GameScore.find({ user_id: req.user.id });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get game scores' });
  }
};

module.exports = { saveGameScore, getGameScores };
