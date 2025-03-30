import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Game List Data
const games = [
  {
    name: "🎧 Match the Sound",
    path: "/game/sound-match",
    color: "#FF6F61",
    description: "Listen and select the correct letter.",
  },
  {
    name: "🧩 Letter-Image Match",
    path: "/game/image-match",
    color: "#4CAF50",
    description: "Match images.",
  },
  {
    name: "❓ Quiz Time",
    path: "/game/quiz",
    color: "#FFD700",
    description: "Test your knowledge with fun quizzes.",
  },
  {
    name: "🎯 Memory Match",
    path: "/game/memory-match",
    color: "#FFAB40",
    description: "Match alphabets with corresponding images.",
  },
];

const Games = () => {
  return (
    <div style={styles.container}>
      <motion.h1
        style={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🎮 Choose Your Game!
      </motion.h1>
      <p style={styles.subtitle}>Learn while having fun!</p>

      {/* Game Cards */}
      <div style={styles.grid}>
        {games.map((game, index) => (
          <Link key={index} to={game.path} style={styles.link}>
            <motion.div
              style={{ ...styles.card, backgroundColor: game.color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <h2 style={styles.gameName}>{game.name}</h2>
              <p style={styles.description}>{game.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Back to Home Button */}
      <Link to="/" style={styles.homeButton}>
        🏠 Back to Home
      </Link>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#FDF6E4",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "#FF4081",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    maxWidth: "600px",
  },
  link: {
    textDecoration: "none",
  },
  card: {
    padding: "20px",
    borderRadius: "15px",
    color: "white",
    textAlign: "center",
    boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
    cursor: "pointer",
  },
  gameName: {
    fontSize: "1.5rem",
    marginBottom: "5px",
  },
  description: {
    fontSize: "1rem",
  },
  homeButton: {
    marginTop: "20px",
    textDecoration: "none",
    fontSize: "1.2rem",
    color: "#2196F3",
  },
};

export default Games;
