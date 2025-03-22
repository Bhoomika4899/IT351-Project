const TracingData = require('../models/TracingData');

// Save Tracing Data
const saveTracingData = async (req, res) => {
  const { letter, deviation_score, attempts, correct_attempts } = req.body;

  try {
    const tracingData = await TracingData.create({
      user_id: req.user.id,
      letter,
      deviation_score,
      attempts,
      correct_attempts,
    });

    res.status(201).json(tracingData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save tracing data' });
  }
};

// Get Tracing Data
const getTracingData = async (req, res) => {
  try {
    const tracingData = await TracingData.find({ user_id: req.user.id });
    res.json(tracingData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get tracing data' });
  }
};

module.exports = { saveTracingData, getTracingData };
