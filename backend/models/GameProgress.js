const mongoose = require("mongoose");

const gameProgressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  game: { type: String, required: true }, // Name of the game (e.g., "MemoryMatch")
  total_attempts: { type: Number, default: 0 },
  correct_attempts: { type: Number, default: 0 },
  last_attempt_at: { type: Date, default: Date.now },
});

// Add an index on last_attempt_at to optimize queries
gameProgressSchema.index({ last_attempt_at: -1 });

module.exports = mongoose.model("GameProgress", gameProgressSchema);
