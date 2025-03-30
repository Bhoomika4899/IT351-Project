const mongoose = require('mongoose');

const tracingDataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  letter: { type: String, required: true },
  deviation_score: { type: Number, required: true },
  attempts: { type: Number, default: 0 },
  correct_attempts: { type: Number, default: 0 },
  last_attempt_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TracingData', tracingDataSchema);