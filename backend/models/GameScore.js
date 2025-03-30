const mongoose = require('mongoose');

const gameScoreSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  game_name: { type: String, required: true },
  score: { type: Number, required: true },
  correct_attempts: { type: Number, required: true },
  wrong_attempts: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameScore', gameScoreSchema);
