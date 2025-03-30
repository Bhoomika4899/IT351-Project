import React, { useState } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import { Link } from "react-router-dom";

// Data
const alphabets = [
  { letter: "अ", image: "/hindi_alphabet_image/hindi_letter_1.png", sound: "/hindi_word_audio/hindi_word_1.mp3" },
  { letter: "आ", image: "/hindi_alphabet_image/hindi_letter_2.png", sound: "/hindi_word_audio/hindi_word_2.mp3" },
  { letter: "इ", image: "/hindi_alphabet_image/hindi_letter_3.png", sound: "/hindi_word_audio/hindi_word_3.mp3" },
  { letter: "ई", image: "/hindi_alphabet_image/hindi_letter_4.png", sound: "/hindi_word_audio/hindi_word_4.mp3" },
  { letter: "उ", image: "/hindi_alphabet_image/hindi_letter_5.png", sound: "/hindi_word_audio/hindi_word_5.mp3" },
  { letter: "ऊ", image: "/hindi_alphabet_image/hindi_letter_6.png", sound: "/hindi_word_audio/hindi_word_6.mp3" },
  { letter: "ऋ", image: "/hindi_alphabet_image/hindi_letter_7.png", sound: "/hindi_word_audio/hindi_word_7.mp3" },
  { letter: "ए", image: "/hindi_alphabet_image/hindi_letter_8.png", sound: "/hindi_word_audio/hindi_word_8.mp3" },
  { letter: "ऐ", image: "/hindi_alphabet_image/hindi_letter_9.png", sound: "/hindi_word_audio/hindi_word_9.mp3" },
  { letter: "ओ", image: "/hindi_alphabet_image/hindi_letter_10.png", sound: "/hindi_word_audio/hindi_word_10.mp3" },
  { letter: "औ", image: "/hindi_alphabet_image/hindi_letter_11.png", sound: "/hindi_word_audio/hindi_word_11.mp3" },
  { letter: "अं", image: "/hindi_alphabet_image/hindi_letter_12.png", sound: "/hindi_word_audio/hindi_word_12.mp3" },
  { letter: "अः", image: "/hindi_alphabet_image/hindi_letter_13.png", sound: "/hindi_word_audio/hindi_word_13.mp3" },

  { letter: "क", image: "/hindi_alphabet_image/hindi_letter_14.png", sound: "/hindi_word_audio/hindi_word_14.mp3" },
  { letter: "ख", image: "/hindi_alphabet_image/hindi_letter_15.png", sound: "/hindi_word_audio/hindi_word_15.mp3" },
  { letter: "ग", image: "/hindi_alphabet_image/hindi_letter_16.png", sound: "/hindi_word_audio/hindi_word_16.mp3" },
  { letter: "घ", image: "/hindi_alphabet_image/hindi_letter_17.png", sound: "/hindi_word_audio/hindi_word_17.mp3" },
  { letter: "ङ", image: "/hindi_alphabet_image/hindi_letter_18.png", sound: "/hindi_word_audio/hindi_word_18.mp3" },

  { letter: "च", image: "/hindi_alphabet_image/hindi_letter_19.png", sound: "/hindi_word_audio/hindi_word_19.mp3" },
  { letter: "छ", image: "/hindi_alphabet_image/hindi_letter_20.png", sound: "/hindi_word_audio/hindi_word_20.mp3" },
  { letter: "ज", image: "/hindi_alphabet_image/hindi_letter_21.png", sound: "/hindi_word_audio/hindi_word_21.mp3" },
  { letter: "झ", image: "/hindi_alphabet_image/hindi_letter_22.png", sound: "/hindi_word_audio/hindi_word_22.mp3" },
  { letter: "ञ", image: "/hindi_alphabet_image/hindi_letter_23.png", sound: "/hindi_word_audio/hindi_word_23.mp3" },

  { letter: "ट", image: "/hindi_alphabet_image/hindi_letter_24.png", sound: "/hindi_word_audio/hindi_word_24.mp3" },
  { letter: "ठ", image: "/hindi_alphabet_image/hindi_letter_25.png", sound: "/hindi_word_audio/hindi_word_25.mp3" },
  { letter: "ड", image: "/hindi_alphabet_image/hindi_letter_26.png", sound: "/hindi_word_audio/hindi_word_26.mp3" },
  { letter: "ढ", image: "/hindi_alphabet_image/hindi_letter_27.png", sound: "/hindi_word_audio/hindi_word_27.mp3" },
  { letter: "ण", image: "/hindi_alphabet_image/hindi_letter_28.png", sound: "/hindi_word_audio/hindi_word_28.mp3" },

  { letter: "त", image: "/hindi_alphabet_image/hindi_letter_29.png", sound: "/hindi_word_audio/hindi_word_29.mp3" },
  { letter: "थ", image: "/hindi_alphabet_image/hindi_letter_30.png", sound: "/hindi_word_audio/hindi_word_30.mp3" },
  { letter: "द", image: "/hindi_alphabet_image/hindi_letter_31.png", sound: "/hindi_word_audio/hindi_word_31.mp3" },
  { letter: "ध", image: "/hindi_alphabet_image/hindi_letter_32.png", sound: "/hindi_word_audio/hindi_word_32.mp3" },
  { letter: "न", image: "/hindi_alphabet_image/hindi_letter_33.png", sound: "/hindi_word_audio/hindi_word_33.mp3" },

  { letter: "प", image: "/hindi_alphabet_image/hindi_letter_34.png", sound: "/hindi_word_audio/hindi_word_34.mp3" },
  { letter: "फ", image: "/hindi_alphabet_image/hindi_letter_35.png", sound: "/hindi_word_audio/hindi_word_35.mp3" },
  { letter: "ब", image: "/hindi_alphabet_image/hindi_letter_36.png", sound: "/hindi_word_audio/hindi_word_36.mp3" },
  { letter: "भ", image: "/hindi_alphabet_image/hindi_letter_37.png", sound: "/hindi_word_audio/hindi_word_37.mp3" },
  { letter: "म", image: "/hindi_alphabet_image/hindi_letter_38.png", sound: "/hindi_word_audio/hindi_word_38.mp3" },

  { letter: "य", image: "/hindi_alphabet_image/hindi_letter_39.png", sound: "/hindi_word_audio/hindi_word_39.mp3" },
  { letter: "र", image: "/hindi_alphabet_image/hindi_letter_40.png", sound: "/hindi_word_audio/hindi_word_40.mp3" },
  { letter: "ल", image: "/hindi_alphabet_image/hindi_letter_41.png", sound: "/hindi_word_audio/hindi_word_41.mp3" },
  { letter: "व", image: "/hindi_alphabet_image/hindi_letter_42.png", sound: "/hindi_word_audio/hindi_word_42.mp3" },

  { letter: "श", image: "/hindi_alphabet_image/hindi_letter_43.png", sound: "/hindi_word_audio/hindi_word_43.mp3" },
  { letter: "ष", image: "/hindi_alphabet_image/hindi_letter_44.png", sound: "/hindi_word_audio/hindi_word_44.mp3" },
  { letter: "स", image: "/hindi_alphabet_image/hindi_letter_45.png", sound: "/hindi_word_audio/hindi_word_45.mp3" },
  { letter: "ह", image: "/hindi_alphabet_image/hindi_letter_46.png", sound: "/hindi_word_audio/hindi_word_46.mp3" },
  { letter: "क्ष", image: "/hindi_alphabet_image/hindi_letter_47.png", sound: "/hindi_word_audio/hindi_word_47.mp3" },
  { letter: "त्र", image: "/hindi_alphabet_image/hindi_letter_48.png", sound: "/hindi_word_audio/hindi_word_48.mp3" },
  { letter: "ज्ञ", image: "/hindi_alphabet_image/hindi_letter_49.png", sound: "/hindi_word_audio/hindi_word_49.mp3" },
  { letter: "श्र", image: "/hindi_alphabet_image/hindi_letter_50.png", sound: "/hindi_word_audio/hindi_word_50.mp3" },

  { letter: "ड़", image: "/hindi_alphabet_image/hindi_letter_51.png", sound: "/hindi_word_audio/hindi_word_51.mp3" },
  { letter: "ढ़", image: "/hindi_alphabet_image/hindi_letter_52.png", sound: "/hindi_word_audio/hindi_word_52.mp3" }
];



const Alphabet = () => {
  const [index, setIndex] = useState(0);
  const currentAlphabet = alphabets[index];

  // Function to play sound
  const playSound = () => {
    const sound = new Howl({ src: [currentAlphabet.sound] });
    sound.play();
  };

  // Navigation Functions
  const nextLetter = () => setIndex((prev) => (prev + 1) % alphabets.length);
  const prevLetter = () =>
    setIndex((prev) => (prev - 1 + alphabets.length) % alphabets.length);

  return (
    <div style={styles.container}>
      {/* Title */}
      <motion.h1 style={styles.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        🔠 Alphabet Display
      </motion.h1>

      {/* Alphabet Card */}
      <motion.div
        style={styles.card}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 style={styles.letter} whileTap={{ scale: 1.2 }}>
          {currentAlphabet.letter}
        </motion.h2>
        <img src={currentAlphabet.image} alt="Alphabet" style={styles.image} />
        <motion.button style={styles.soundButton} whileTap={{ scale: 0.9 }} onClick={playSound}>
          🔊 Play Sound
        </motion.button>
      </motion.div>

      {/* Navigation Buttons */}
      <div style={styles.buttonContainer}>
        <motion.button style={styles.button} whileTap={{ scale: 0.9 }} onClick={prevLetter}>
          ⬅️ Previous
        </motion.button>
        <motion.button style={styles.button} whileTap={{ scale: 0.9 }} onClick={nextLetter}>
          Next ➡️
        </motion.button>
      </div>

      {/* Home Button */}
      <Link to="/" style={styles.homeButton}>🏠 Home</Link>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#FDEB98",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.2rem",
    color: "#FF5722",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  card: {
    background: "#FFF",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "4px 4px 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "300px",
  },
  letter: {
    fontSize: "5rem",
    color: "#673AB7",
    marginBottom: "10px",
  },
  image: {
    width: "150px",
    height: "150px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  soundButton: {
    fontSize: "1.2rem",
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#FF4081",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    fontSize: "1rem",
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  homeButton: {
    marginTop: "20px",
    textDecoration: "none",
    fontSize: "1.2rem",
    color: "#2196F3",
  },
};

export default Alphabet;
