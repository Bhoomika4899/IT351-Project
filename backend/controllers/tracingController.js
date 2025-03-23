const TracingData = require('../models/TracingData');

// Save Tracing Data
const saveTracingData = async (req, res) => {
  const { letter, deviation_score, attempts, correct_attempts } = req.body;
  console.log("Received data:", req.body); // <-- Add this for debugging

  try {
    const user_id = '507f191e810c19729de860ea';  // Temporary valid ObjectId
    const tracingData = await TracingData.create({
     // user_id: req.user.id,  UNCOMMENT THIS LATER****
      user_id,  //REMOVE THIS LATER***
      letter,
      deviation_score,
      attempts,
      correct_attempts,
    });

    console.log("Saved successfully:", tracingData); // <-- Add this to confirm saving

    res.status(201).json(tracingData);
  } catch (error) {
    console.error("Error saving data:", error);
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
