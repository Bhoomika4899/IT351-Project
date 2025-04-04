const GameProgress = require("../models/GameProgress");

const getGameProgress = async (req, res) => {
  try {
    const { gameName } = req.params;
    const user_id = "507f191e810c19729de860ea"; // Placeholder for user ID

    const progress = await GameProgress.findOne({ user_id, game: gameName });

    if (!progress) {
      return res.json({ total_attempts: 0, correct_attempts: 0, progress: 0 });
    }

    const progressPercentage = progress.total_attempts
      ? (progress.correct_attempts / progress.total_attempts) * 100
      : 0;

    res.json({ ...progress.toObject(), progress: progressPercentage });
  } catch (error) {
    console.error("Error fetching game progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateGameProgress = async (req, res) => {
  try {
    const { gameName } = req.params;
    const { correct } = req.body; // Expecting `{ correct: true/false }`
    const user_id = "507f191e810c19729de860ea"; // Placeholder for user ID

    let progress = await GameProgress.findOne({ user_id, game: gameName });

    if (!progress) {
      progress = new GameProgress({
        user_id,
        game: gameName,
        total_attempts: 0,
        correct_attempts: 0,
      });
    }

    progress.total_attempts += 1;
    if (correct) {
      progress.correct_attempts += 1;
    }
    progress.last_attempt_at = new Date();

    await progress.save();

    res.json({ message: "Progress updated successfully!" });
  } catch (error) {
    console.error("Error updating game progress:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getGameProgress, updateGameProgress };
