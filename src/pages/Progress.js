import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Progress = () => {
  const [progressData, setProgressData] = useState({
    tracingProgress: {},
    gameScores: {
      MemoryMatch: 0,
      SoundMatch: 0,
      ImageMatch: 0,
      Quiz: 0,
    },
  });

  const letters = [
    "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण",
    "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श",
    "ष", "स", "ह", "क्ष", "त्र", "ज्ञ", "०", "१", "२", "३", "४", "५", "६", "७", "८", "९"
  ];

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const tracingProgress = {};
        for (const letter of letters) {
          const response = await axios.get(`/api/progress/${letter}`);
          const { totalAttempts, correctAttempts } = response.data;
          tracingProgress[letter] =
            totalAttempts > 0 ? correctAttempts / totalAttempts : 0;
        }

        // Fetch game progress for each game separately
        const gameNames = ["MemoryMatch", "SoundMatch", "ImageMatch", "Quiz"];
        const gameProgressResponses = await Promise.all(
          gameNames.map((game) =>
            axios.get(`/api/games/${game}`).then((res) => ({
              [game]: res.data.correct_attempts || 0,
            }))
          )
        );

        const gameScores = Object.assign({}, ...gameProgressResponses);

        setProgressData({
          tracingProgress,
          gameScores,
        });
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div style={styles.container}>
      {/* Title */}
      <motion.h1
        style={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎮 Your Learning Progress
      </motion.h1>

      <p style={styles.subtitle}>Keep going, you're doing great! 🌟</p>

      {/* Tracing Progress Section */}
      <div style={styles.section}>
        <motion.h2
          style={styles.sectionTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ✍️ Letter Tracing Progress
        </motion.h2>

        <div style={styles.cardsContainer}>
          {letters.map((letter, index) => {
            const progress = progressData.tracingProgress[letter] || 0;
            return (
              <motion.div
                key={index}
                style={styles.card}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={styles.cardHeader}>{letter}</div>
                <div style={styles.progressBarContainer}>
                  <div
                    style={{
                      ...styles.progressBar,
                      width: `${progress * 100}%`,
                    }}
                  />
                </div>
                <div style={styles.progressText}>
                  {Math.round(progress * 100)}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Game Scores Section */}
      <div style={styles.section}>
        <motion.h2
          style={styles.sectionTitle}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎯 Game Scores
        </motion.h2>

        <div style={styles.cardsContainer}>
          {Object.entries(progressData.gameScores).map(([game, correctAttempts], index) => (
            <motion.div
              key={index}
              style={styles.card}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={styles.cardHeader}>{game}</div>
              <p style={styles.correctAttempts}>✅ Correct Attempts: {correctAttempts}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back to Home Button */}
      <Link to="/" style={styles.homeButton}>
        🏠 Back to Home
      </Link>
    </div>
  );
};

// Styles remain unchanged
const styles = {
  container: {
    backgroundColor: "#FFFAE3",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "30px",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    fontSize: "3rem",
    color: "#FF4F5A",
    marginBottom: "10px",
    textAlign: "center",
    fontWeight: "bold",
    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
  },
  subtitle: {
    fontSize: "1.5rem",
    color: "#6A4C93",
    marginBottom: "30px",
    fontWeight: "lighter",
  },
  section: {
    width: "100%",
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: "#FF4F5A",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  cardsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#6A4C93",
    padding: "20px",
    borderRadius: "20px",
    color: "white",
    width: "150px",
    textAlign: "center",
    boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
  cardHeader: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  correctAttempts: {
    fontSize: "1.2rem",
    color: "#FFF",
    fontWeight: "bold",
  },
  homeButton: {
    backgroundColor: "#FF6F61",
    color: "white",
    padding: "10px 20px",
    borderRadius: "15px",
    fontSize: "1.2rem",
    textDecoration: "none",
    marginTop: "20px",
    display: "inline-block",
    boxShadow: "4px 4px 8px rgba(0,0,0,0.2)",
  },
};

export default Progress;
