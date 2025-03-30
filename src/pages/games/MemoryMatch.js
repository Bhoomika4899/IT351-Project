import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const hindiAlphabets = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ऋ", "ए", "ऐ", "ओ", "औ", "अं", "अः",
  "क", "ख", "ग", "घ", "ङ", "च", "छ", "ज", "झ", "ञ", "ट", "ठ", "ड", "ढ", "ण", 
  "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", 
  "ष", "स", "ह", "क्ष", "त्र", "ज्ञ", "श्र", "ड़", "ढ़"
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    generateNewSet();
  }, []);

  const generateNewSet = () => {
    const selectedLetters = shuffleArray([...hindiAlphabets]).slice(0, 4);
    const letterCards = selectedLetters.map((letter) => ({ type: "letter", value: letter }));
    const imageCards = selectedLetters.map((letter) => ({ type: "image", value: letter }));
    const newCards = shuffleArray([...letterCards, ...imageCards]);
    setCards(newCards);
    setMatchedPairs([]);
    setSelectedCards([]);
  };

  const handleCardClick = (index) => {
    if (selectedCards.length < 2 && !matchedPairs.includes(index)) {
      setSelectedCards((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstIndex, secondIndex] = selectedCards;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setTimeout(() => {
          setMatchedPairs((prev) => [...prev, firstIndex, secondIndex]);
        }, 500);
      }
      setTimeout(() => setSelectedCards([]), 1000);
    }
  }, [selectedCards]);

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        style={styles.title} 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        🧠 Memory Match: Letters & Images!
      </motion.h1>
      <div style={styles.grid}>
        {cards.map((card, index) => (
          <motion.div
            key={index}
            style={{
              ...styles.card,
              backgroundColor: matchedPairs.includes(index) || selectedCards.includes(index) ? "#FFF" : "#FFAB40",
            }}
            onClick={() => handleCardClick(index)}
            animate={{ rotateY: selectedCards.includes(index) || matchedPairs.includes(index) ? 0 : 180 }}
            transition={{ duration: 0.5 }}
            whileTap={{ scale: 0.9 }}
            whileHover={matchedPairs.includes(index) ? { scale: 1.1, boxShadow: "0px 0px 15px #4CAF50" } : {}}
          >
            {(matchedPairs.includes(index) || selectedCards.includes(index)) && (
              card.type === "letter" ? (
                <motion.span animate={{ scale: matchedPairs.includes(index) ? 1.2 : 1 }} transition={{ duration: 0.3 }}>
                  {card.value}
                </motion.span>
              ) : (
                <motion.img 
                  src={`/hindi_alphabet_image/hindi_letter_${hindiAlphabets.indexOf(card.value) + 1}.png`} 
                  alt={card.value} 
                  style={styles.image} 
                  animate={{ scale: matchedPairs.includes(index) ? 1.2 : 1 }} 
                  transition={{ duration: 0.3 }}
                />
              )
            )}
          </motion.div>
        ))}
      </div>
      {matchedPairs.length === 8 && (
        <motion.button style={styles.newSetButton} onClick={generateNewSet} whileTap={{ scale: 0.9 }}>
          🎉 New Set!
        </motion.button>
      )}
      <Link to="/games" style={styles.homeButton}>🔙 Back to Games</Link>
    </motion.div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#E1F5FE",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "2.5rem",
    color: "#0288D1",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 100px)",
    gap: "15px",
  },
  card: {
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    borderRadius: "10px",
    boxShadow: "4px 4px 12px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transformStyle: "preserve-3d",
  },
  image: {
    width: "80px",
    height: "80px",
  },
  newSetButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "1.5rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  homeButton: {
    marginTop: "20px",
    textDecoration: "none",
    fontSize: "1.2rem",
    color: "#D32F2F",
  },
};

export default MemoryMatch;
