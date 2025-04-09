const TracingData = require('../models/TracingData');
const GameProgress = require("../models/GameProgress");
const mongoose = require("mongoose");

//const getProgressByLetter = async (req, res) => {
//  try {
//    const { letter } = req.params;

//    // Aggregate total attempts and correct attempts for the given letter
//    const progress = await TracingData.aggregate([
//      { $match: { letter: letter, user_id: new mongoose.Types.ObjectId('507f191e810c19729de860ea') } },
//      { 
//        $group: { 
//          _id: "$letter", 
//          totalAttempts: { $sum: 1 },
//          correctAttempts: { $sum: { $cond: ["$isCorrect", 1, 0] } }
//        }
//      }
//    ]);

//    if (progress.length === 0) {
//      return res.json({ letter, totalAttempts: 0, correctAttempts: 0 });
//    }

//    res.json(progress[0]);
//  } catch (error) {
//    console.error("Error fetching progress:", error);
//    res.status(500).json({ error: "Internal server error" });
//  }
//};

const getProgressByLetter = async (req, res) => {
  try {
    const { letter } = req.params;

    const progress = await TracingData.findOne({
      letter: letter,
      user_id: new mongoose.Types.ObjectId('507f191e810c19729de860ea')
    }).sort({ attempts: -1 });  // Sort by attempts descending

    if (!progress) {
      return res.json({ letter, totalAttempts: 0, correctAttempts: 0 });
    }
    
    console.log(progress);

    res.json({
      letter: progress.letter,
      totalAttempts: progress.attempts,
      correctAttempts: progress.correct_attempts
    });

  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getGameProgress = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId("507f191e810c19729de860ea"); // Replace with actual user authentication logic

    const progress = await GameProgress.find({ user_id: userId });

    // Convert the progress array into an object with game names as keys
    const gameScores = {};
    progress.forEach((entry) => {
      gameScores[entry.game] = entry.correct_attempts; // Only store correct attempts
    });

    res.json(gameScores);
  } catch (error) {
    console.error("Error fetching game progress:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {getProgressByLetter, getGameProgress};
