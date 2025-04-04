import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Howl } from "howler";
import axios from "axios"; // Import axios for API calls

// Hindi alphabet list
const hindiAlphabets = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
  "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
  "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
  "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व",
  "श", "ष", "स", "ह", "क्ष", "त्र", "ज्ञ", "श्र",
  "ड़", "ढ़"
];

// Shuffle function to randomize options
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const SoundMatch = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0); // Track user's score

  // Load game progress when the component mounts
  useEffect(() => {
    fetchGameProgress();
  }, []);

  // Fetch game progress from API
  const fetchGameProgress = async () => {
    try {
      const response = await axios.get("/api/games/SoundMatch");
      setScore(response.data.correct_attempts); // ✅ Correct field
    } catch (error) {
      console.error("Error fetching game progress:", error);
    }
  };

  // Load new question on mount or change
  useEffect(() => {
    generateNewQuestion();
  }, [currentIndex]);

  // Generate a new question
  const generateNewQuestion = () => {
    const correctAlphabet = hindiAlphabets[currentIndex];
    const incorrectOptions = shuffleArray(
      hindiAlphabets.filter((_, index) => index !== currentIndex)
    ).slice(0, 2);
    const newOptions = shuffleArray([correctAlphabet, ...incorrectOptions]);
    setOptions(newOptions);
    setCorrectIndex(newOptions.indexOf(correctAlphabet));
    playSound(currentIndex + 1);
  };

  // Play sound for current alphabet
  const playSound = (index) => {
    const soundPath = `/hindi_alphabet_audio/hindi_letter_${index}.mp3`;
    const sound = new Howl({ src: [soundPath] });
    sound.play();
  };

  // Handle option selection
  const handleOptionClick = async (selectedIndex) => {
    if (selectedIndex === correctIndex) {
      setFeedback("✅ Correct! Great Job!");
      setScore((prevScore) => prevScore + 1); // Increase local score

      // Send progress update to backend
      try {
        await axios.post("/api/games/SoundMatch", {
          correct: selectedIndex === correctIndex, // ✅ Send correct: true/false
        });
      } catch (error) {
        console.error("Error updating progress:", error);
      }

      setTimeout(() => {
        setFeedback("");
        nextAlphabet();
      }, 1000);
    } else {
      setFeedback("❌ Oops! Try again.");
      setTimeout(() => setFeedback(""), 800);
    }
  };

  // Go to the next alphabet
  const nextAlphabet = () => {
    setCurrentIndex((prev) => (prev + 1) % hindiAlphabets.length);
  };

  return (
    <div style={styles.container}>
      <motion.h1
        style={styles.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🎧 Match the Sound!
      </motion.h1>

      {/* Display Current Score */}
      <motion.p style={styles.scoreText}>
        🎯 Score: {score}
      </motion.p>

      <motion.div
        style={styles.soundButton}
        whileTap={{ scale: 0.9 }}
        onClick={() => playSound(currentIndex + 1)}
      >
        🔊 Play Sound Again
      </motion.div>

      <div style={styles.optionsContainer}>
        {options.map((option, index) => (
          <motion.button
            key={index}
            style={styles.optionButton}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(index)}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {feedback && (
        <motion.p
          style={styles.feedback}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {feedback}
        </motion.p>
      )}

      <Link to="/games" style={styles.homeButton}>
        🔙 Back to Games
      </Link>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#FFF3E0",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "#FF5722",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  scoreText: {
    fontSize: "1.5rem",
    color: "#00796B",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  soundButton: {
    backgroundColor: "#FF4081",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginBottom: "30px",
  },
  optionsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  optionButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "15px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1.5rem",
  },
  feedback: {
    fontSize: "1.5rem",
    marginTop: "20px",
    fontWeight: "bold",
    color: "#FF4081",
  },
  homeButton: {
    marginTop: "20px",
    textDecoration: "none",
    fontSize: "1.2rem",
    color: "#2196F3",
  },
};

export default SoundMatch;
