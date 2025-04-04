const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    userId: String,
    tracedLetters: [String],  // Letters the child has mastered
    gameScores: {             // Scores from different games
        MemoryMatch: Number,
        SoundMatch: Number,
        LetterMatch: Number,
        Quiz: Number
    }
});

module.exports = mongoose.model("Progress", progressSchema);
