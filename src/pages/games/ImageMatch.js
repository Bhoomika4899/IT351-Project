import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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

// Shuffle function
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const ImageMatch = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0); // Track score

  // Fetch game progress when component mounts
  useEffect(() => {
    fetchGameProgress();
  }, []);

  // Fetch progress from API
  const fetchGameProgress = async () => {
    try {
      const response = await axios.get("/api/games/ImageMatch");
      setScore(response.data.correct_attempts); // ✅ Correct field
    } catch (error) {
      console.error("Error fetching game progress:", error);
    }
  };

  useEffect(() => {
    generateNewQuestion();
  }, [currentIndex]);

  const generateNewQuestion = () => {
    const correctAlphabet = hindiAlphabets[currentIndex];
    const incorrectOptions = shuffleArray(
      hindiAlphabets.filter((_, index) => index !== currentIndex)
    ).slice(0, 2);
    const newOptions = shuffleArray([correctAlphabet, ...incorrectOptions]);
    setOptions(newOptions);
    setCorrectIndex(newOptions.indexOf(correctAlphabet));
  };

  // Get image path
  const getImagePath = (index) => {
    return `/hindi_alphabet_image/hindi_letter_${index}.png`;
  };

  // Handle answer selection
  const handleOptionClick = async (selectedIndex) => {
    const isCorrect = selectedIndex === correctIndex;

    if (isCorrect) {
      setFeedback("✅ Correct! Great Job!");
      setScore((prevScore) => prevScore + 1); // Update local score

      // Send progress to backend
      try {
        await axios.post("/api/games/ImageMatch", { correct: true });
      } catch (error) {
        console.error("Error updating progress:", error);
      }

      setTimeout(() => {
        setFeedback("");
        nextAlphabet();
      }, 1000);
    } else {
      setFeedback("❌ Oops! Try again.");

      // Send incorrect attempt to backend
      try {
        await axios.post("/api/games/ImageMatch", { correct: false });
      } catch (error) {
        console.error("Error updating progress:", error);
      }

      setTimeout(() => setFeedback(""), 800);
    }
  };

  // Go to next alphabet
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
        🧩 Match the Alphabet to the Image!
      </motion.h1>

      {/* Display Score */}
      <motion.p style={styles.scoreText}>
        🎯 Score: {score}
      </motion.p>

      {/* Display Image */}
      <motion.img
        src={getImagePath(currentIndex + 1)}
        alt="Alphabet"
        style={styles.image}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Option Buttons */}
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

      {/* Back to Games Button */}
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
    backgroundColor: "#E8F5E9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "#4CAF50",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  scoreText: {
    fontSize: "1.5rem",
    color: "#00796B",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  image: {
    width: "200px",
    height: "200px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
  },
  optionsContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  optionButton: {
    backgroundColor: "#FF4081",
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

export default ImageMatch;
