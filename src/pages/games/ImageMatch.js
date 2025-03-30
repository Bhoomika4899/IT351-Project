import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const ImageMatch = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [feedback, setFeedback] = useState("");

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
  };

  // Get image path for current alphabet
  const getImagePath = (index) => {
    return `/hindi_alphabet_image/hindi_letter_${index}.png`;
  };

  // Handle option selection
  const handleOptionClick = (selectedIndex) => {
    if (selectedIndex === correctIndex) {
      setFeedback("✅ Correct! Great Job!");
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
        🧩 Match the Alphabet to the Image!
      </motion.h1>

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
