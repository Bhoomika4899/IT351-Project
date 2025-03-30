const TracingData = require('../models/TracingData');
const axios = require('axios');

// Save Tracing Data
const saveTracingData = async (req, res) => {
  const { letter, deviation_score, attempts, correct_attempts } = req.body;
  console.log("Received data:", req.body); // <-- Add this for debugging
  
  if (!deviation_score) {
    console.error("⚠️ deviation_score is missing in request!");
    return res.status(400).json({ message: "deviation_score is required" });
  }


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

// Predict Tracing Data using Python Model
const predictTracingData = async (req, res) => {
  const { canvas_data } = req.body; // ✅ Corrected key

  try {
    // Send image to Python Flask server
    const response = await axios.post('http://127.0.0.1:5001/predict', {
      canvas_data, // ✅ Corrected key
    });

    console.log("📚 Prediction Response:", response.data);

    res.status(200).json({
      deviation_score: response.data.deviation_score,
      isCorrect: response.data.isCorrect || response.data.deviation_score < 5,
    });
  } catch (error) {
    console.error("❌ Prediction error:", error);
    res.status(500).json({ message: "Failed to predict tracing data" });
  }
};



module.exports = { saveTracingData, getTracingData, predictTracingData };