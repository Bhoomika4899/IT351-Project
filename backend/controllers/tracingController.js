const TracingData = require('../models/TracingData');
const axios = require('axios');

// Save Tracing Data
//const saveTracingData = async (req, res) => {
//  const { letter, deviation_score, attempts, isCorrect } = req.body;

//  console.log("📚 Received data:", req.body); // ✅ Debugging line

//  if (!deviation_score) {
//    console.error("⚠️ deviation_score is missing in request!");
//    return res.status(400).json({ message: "deviation_score is required" });
//  }

//  try {
//    const user_id = '507f191e810c19729de860ea'; // Temporary valid ObjectId

//    // Fetch existing tracing data for the letter
//    const existingData = await TracingData.findOne({ user_id, letter });

//    let correct_attempts = existingData?.correct_attempts || 0;
//    if (isCorrect) {
//      correct_attempts += 1; // ✅ Increment only if correct
//    }

//    const tracingData = await TracingData.create({
//      user_id,
//      letter,
//      deviation_score,
//      attempts,
//      correct_attempts, // ✅ Save updated value
//    });

//    console.log("✅ Saved successfully:", tracingData);

//    res.status(201).json(tracingData);
//  } catch (error) {
//    console.error("❌ Error saving data:", error);
//    res.status(500).json({ message: "Failed to save tracing data" });
//  }
//};

// Save Tracing Data
const saveTracingData = async (req, res) => {
  const { letter, deviation_score, isCorrect } = req.body;

  console.log("📚 Received data:", req.body);

  if (!deviation_score) {
    console.error("⚠️ deviation_score is missing in request!");
    return res.status(400).json({ message: "deviation_score is required" });
  }

  try {
    const user_id = '507f191e810c19729de860ea'; // Temporary valid ObjectId

    // Fetch the most recent record for the user and letter
    const latestData = await TracingData.findOne({ user_id, letter })
      .sort({ last_attempt_at: -1 })  // Sort by last attempt to get most recent record
      .select("attempts correct_attempts"); // Select only relevant fields

    // Debugging: Check if we got any data from the DB
    if (latestData) {
      console.log("📖 Found existing data for this letter:", latestData);
    } else {
      console.log(`❌ No previous attempts for letter ${letter}. Starting fresh.`);
    }

    let attempts = 1; // Default for the very first record
    let correct_attempts = isCorrect ? 1 : 0; // If correct, set to 1, else set to 0

    if (latestData) {
      // If there's previous data, we increment attempts and correct_attempts based on that
      attempts = latestData.attempts + 1;
      correct_attempts = latestData.correct_attempts + (isCorrect ? 1 : 0);
      console.log("🔄 Updated attempts and correct_attempts:", attempts, correct_attempts);
    }

    // Create a new tracing record with the updated values
    const tracingData = await TracingData.create({
      user_id,
      letter,
      deviation_score,
      attempts,
      correct_attempts,
      last_attempt_at: new Date(), // Update last attempt timestamp to now
    });

    console.log("✅ Saved new tracing data:", tracingData);
    res.status(201).json(tracingData); // Return the new record with updated attempts and correct_attempts
  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ message: "Failed to save tracing data" });
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
  const { canvas_data, letter } = req.body; // ✅ Include letter for comparison

  try {
    // Send image to Python Flask server
    const response = await axios.post('http://127.0.0.1:5001/predict', {
      canvas_data,
      letter, // ✅ Send expected letter
    });

    console.log("📚 Prediction Response:", response.data);

    // Check if prediction is correct
    const isCorrect = response.data.isCorrect;
    const correct_attempts = isCorrect ? 1 : 0; // ✅ Correct attempts logic

    res.status(200).json({
      deviation_score: response.data.deviation_score,
      isCorrect,
      correct_attempts, // ✅ Send updated correct_attempts
    });
  } catch (error) {
    console.error("❌ Prediction error:", error);
    res.status(500).json({ message: "Failed to predict tracing data" });
  }
};

// Get Tracing Progress for a specific letter
const getTracingProgress = async (req, res) => {
  const { letter } = req.params;
  const user_id = '507f191e810c19729de860ea'; // Temporary valid ObjectId

  try {
    // Fetch existing tracing data for the letter
    const existingData = await TracingData.findOne({ user_id, letter });

    if (!existingData) {
      // If no data exists, return the default progress
      return res.json({ attempts: 1, correct_attempts: 0 });
    }

    // Return current progress
    res.json({
      attempts: existingData.attempts,
      correct_attempts: existingData.correct_attempts,
    });
  } catch (error) {
    console.error("❌ Error fetching tracing progress:", error);
    res.status(500).json({ message: "Failed to fetch tracing progress" });
  }
};


module.exports = { saveTracingData, getTracingData, predictTracingData, getTracingProgress };