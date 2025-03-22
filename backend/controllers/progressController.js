const Progress = require('../models/Progress');

// Get Progress
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ user_id: req.user.id });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch progress' });
  }
};

module.exports = { getProgress };
