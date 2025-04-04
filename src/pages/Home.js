import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Header Section */}
      <motion.h1 
        style={styles.title} 
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        ✨ Let's Begin the Hindi Alphabet Adventure! ✨
      </motion.h1>
      <motion.p 
        style={styles.subtitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Trace, Play, and Explore—One Letter at a Time! 🌟
      </motion.p>

      {/* Buttons Section */}
      <div style={styles.buttonContainer}>
        <NavButton to="/alphabet" color="#FF6F61" text="📖 Learn Alphabets" />
        <NavButton to="/tracing" color="#FFD700" text="✍️ Trace Letters" />
        <NavButton to="/games" color="#4CAF50" text="🎮 Play Games" />
        <NavButton to="/progress" color="#2196F3" text="📊 Your Progress" />
      </div>

      {/* Background Animation */}
      <div style={styles.floatingElements}>
        <motion.span style={{ ...styles.floatingBubble, top: "15%", left: "10%" }} animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>🔵</motion.span>
        <motion.span style={{ ...styles.floatingBubble, top: "40%", right: "15%" }} animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🟠</motion.span>
        <motion.span style={{ ...styles.floatingBubble, bottom: "20%", left: "30%" }} animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>🟣</motion.span>
      </div>
    </div>
  );
};

// Button Component
const NavButton = ({ to, color, text }) => (
  <motion.div 
    whileHover={{ scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" }}
    whileTap={{ scale: 0.9 }} 
    transition={{ duration: 0.2 }}
    style={{ borderRadius: "20px", overflow: "hidden" }}
  >
    <Link to={to} style={{ ...styles.button, backgroundColor: color }}>
      {text}
    </Link>
  </motion.div>
);

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#FDEEF4", // Soft pink background
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
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
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    maxWidth: "400px",
  },
  button: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.5rem",
    padding: "15px 20px",
    borderRadius: "20px",
    textAlign: "center",
    display: "inline-block",
    boxShadow: "3px 3px 10px rgba(0,0,0,0.2)",
    minWidth: "160px",
    transition: "all 0.3s ease-in-out",
  },
  floatingElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  floatingBubble: {
    position: "absolute",
    fontSize: "3rem",
    opacity: 0.7,
  },
};

export default Home;
