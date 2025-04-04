import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API calls

const hindiAlphabets = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
  "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ",
  "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न",
  "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व",
  "श", "ष", "स", "ह", "क्ष", "त्र", "ज्ञ", "श्र",
  "ड़", "ढ़"
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const Quiz = () => {
  const [currentLetter, setCurrentLetter] = useState("");
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0); // Track user's score

  // Load game progress when the component mounts
  useEffect(() => {
    fetchGameProgress();
  }, []);

  // Fetch game progress from API
  const fetchGameProgress = async () => {
    try {
      const response = await axios.get("/api/games/Quiz");
      setScore(response.data.correct_attempts); // ✅ Correct field
    } catch (error) {
      console.error("Error fetching game progress:", error);
    }
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const correctLetter = hindiAlphabets[Math.floor(Math.random() * hindiAlphabets.length)];
    const incorrectOptions = shuffleArray(
      hindiAlphabets.filter((letter) => letter !== correctLetter)
    ).slice(0, 2);
    const newOptions = shuffleArray([correctLetter, ...incorrectOptions]);
    setCurrentLetter(correctLetter);
    setOptions(newOptions);
    setFeedback("");
  };

  const handleOptionClick = async (selectedLetter) => {
    const isCorrect = selectedLetter === currentLetter;

    if (isCorrect) {
      setFeedback("✅ Yay! You got it!");
      setScore((prevScore) => prevScore + 1); // Increase local score

      // Send progress update to backend
      try {
        await axios.post("/api/games/Quiz", { correct: true });
      } catch (error) {
        console.error("Error updating progress:", error);
      }

      setTimeout(() => {
        setFeedback("");
        generateNewQuestion();
      }, 1000);
    } else {
      setFeedback("❌ Oops! Try again.");

      // Send incorrect attempt to backend
      try {
        await axios.post("/api/games/Quiz", { correct: false });
      } catch (error) {
        console.error("Error updating progress:", error);
      }

      setTimeout(() => setFeedback(""), 800);
    }
  };

  return (
    <div style={styles.container}>
      <motion.h1
        style={styles.title}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ✏️ Guess the Letter!
      </motion.h1>

      {/* Display Current Score */}
      <motion.p style={styles.scoreText}>
        🎯 Score: {score}
      </motion.p>

      <motion.div
        style={styles.letterOutlineContainer}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="140" height="140" viewBox="0 0 140 140">
          <rect x="10" y="10" width="120" height="120" fill="none" stroke="#FF4081" strokeWidth="4" strokeDasharray="8,10" strokeLinecap="round" />
          <text x="50%" y="50%" fontSize="80" textAnchor="middle" dy=".35em" fill="none" stroke="#FF4081" strokeWidth="4" strokeDasharray="4,6" strokeLinecap="round">
            {currentLetter}
          </text>
        </svg>
      </motion.div>

      <div style={styles.optionsContainer}>
        {options.map((option, index) => (
          <motion.button
            key={index}
            style={styles.optionButton}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionClick(option)}
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

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#FFEBEE",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "#D32F2F",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  scoreText: {
    fontSize: "1.5rem",
    color: "#00796B",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  letterOutlineContainer: {
    width: "140px",
    height: "140px",
    marginBottom: "20px",
  },
  optionsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  optionButton: {
    backgroundColor: "#7E57C2",
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
    color: "#7E57C2",
  },
  homeButton: {
    marginTop: "20px",
    textDecoration: "none",
    fontSize: "1.2rem",
    color: "#D32F2F",
  },
};

export default Quiz;
