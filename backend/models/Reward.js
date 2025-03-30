const mongoose = require('mongoose');

const rewardSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  badges_unlocked: {
    type: [String],
    default: [],
  },
  stars_earned: {
    type: Number,
    default: 0,
  },
  unlocked_levels: {
    type: Number,
    default: 0,
  },
});

const Reward = mongoose.model('Reward', rewardSchema);

module.exports = Reward;
