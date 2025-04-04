// Updated src/pages/Tracing.js
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Howl } from "howler";
import CanvasDraw from "react-canvas-draw";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for API calls
axios.defaults.baseURL = "http://localhost:5000";


// Data
const alphabets = [
  { letter: "क", image: "/hindi_alphabet_image/hindi_letter_14.png", sound: "/hindi_alphabet_audio/hindi_letter_14.mp3" },
  { letter: "ख", image: "/hindi_alphabet_image/hindi_letter_15.png", sound: "/hindi_alphabet_audio/hindi_letter_15.mp3" },
  { letter: "ग", image: "/hindi_alphabet_image/hindi_letter_16.png", sound: "/hindi_alphabet_audio/hindi_letter_16.mp3" },
  { letter: "घ", image: "/hindi_alphabet_image/hindi_letter_17.png", sound: "/hindi_alphabet_audio/hindi_letter_17.mp3" },
  { letter: "ङ", image: "/hindi_alphabet_image/hindi_letter_18.png", sound: "/hindi_alphabet_audio/hindi_letter_18.mp3" },

  { letter: "च", image: "/hindi_alphabet_image/hindi_letter_19.png", sound: "/hindi_alphabet_audio/hindi_letter_19.mp3" },
  { letter: "छ", image: "/hindi_alphabet_image/hindi_letter_20.png", sound: "/hindi_alphabet_audio/hindi_letter_20.mp3" },
  { letter: "ज", image: "/hindi_alphabet_image/hindi_letter_21.png", sound: "/hindi_alphabet_audio/hindi_letter_21.mp3" },
  { letter: "झ", image: "/hindi_alphabet_image/hindi_letter_22.png", sound: "/hindi_alphabet_audio/hindi_letter_22.mp3" },
  { letter: "ञ", image: "/hindi_alphabet_image/hindi_letter_23.png", sound: "/hindi_alphabet_audio/hindi_letter_23.mp3" },

  { letter: "ट", image: "/hindi_alphabet_image/hindi_letter_24.png", sound: "/hindi_alphabet_audio/hindi_letter_24.mp3" },
  { letter: "ठ", image: "/hindi_alphabet_image/hindi_letter_25.png", sound: "/hindi_alphabet_audio/hindi_letter_25.mp3" },
  { letter: "ड", image: "/hindi_alphabet_image/hindi_letter_26.png", sound: "/hindi_alphabet_audio/hindi_letter_26.mp3" },
  { letter: "ढ", image: "/hindi_alphabet_image/hindi_letter_27.png", sound: "/hindi_alphabet_audio/hindi_letter_27.mp3" },
  { letter: "ण", image: "/hindi_alphabet_image/hindi_letter_28.png", sound: "/hindi_alphabet_audio/hindi_letter_28.mp3" },

  { letter: "त", image: "/hindi_alphabet_image/hindi_letter_29.png", sound: "/hindi_alphabet_audio/hindi_letter_29.mp3" },
  { letter: "थ", image: "/hindi_alphabet_image/hindi_letter_30.png", sound: "/hindi_alphabet_audio/hindi_letter_30.mp3" },
  { letter: "द", image: "/hindi_alphabet_image/hindi_letter_31.png", sound: "/hindi_alphabet_audio/hindi_letter_31.mp3" },
  { letter: "ध", image: "/hindi_alphabet_image/hindi_letter_32.png", sound: "/hindi_alphabet_audio/hindi_letter_32.mp3" },
  { letter: "न", image: "/hindi_alphabet_image/hindi_letter_33.png", sound: "/hindi_alphabet_audio/hindi_letter_33.mp3" },

  { letter: "प", image: "/hindi_alphabet_image/hindi_letter_34.png", sound: "/hindi_alphabet_audio/hindi_letter_34.mp3" },
  { letter: "फ", image: "/hindi_alphabet_image/hindi_letter_35.png", sound: "/hindi_alphabet_audio/hindi_letter_35.mp3" },
  { letter: "ब", image: "/hindi_alphabet_image/hindi_letter_36.png", sound: "/hindi_alphabet_audio/hindi_letter_36.mp3" },
  { letter: "भ", image: "/hindi_alphabet_image/hindi_letter_37.png", sound: "/hindi_alphabet_audio/hindi_letter_37.mp3" },
  { letter: "म", image: "/hindi_alphabet_image/hindi_letter_38.png", sound: "/hindi_alphabet_audio/hindi_letter_38.mp3" },

  { letter: "य", image: "/hindi_alphabet_image/hindi_letter_39.png", sound: "/hindi_alphabet_audio/hindi_letter_39.mp3" },
  { letter: "र", image: "/hindi_alphabet_image/hindi_letter_40.png", sound: "/hindi_alphabet_audio/hindi_letter_40.mp3" },
  { letter: "ल", image: "/hindi_alphabet_image/hindi_letter_41.png", sound: "/hindi_alphabet_audio/hindi_letter_41.mp3" },
  { letter: "व", image: "/hindi_alphabet_image/hindi_letter_42.png", sound: "/hindi_alphabet_audio/hindi_letter_42.mp3" },

  { letter: "श", image: "/hindi_alphabet_image/hindi_letter_43.png", sound: "/hindi_alphabet_audio/hindi_letter_43.mp3" },
  { letter: "ष", image: "/hindi_alphabet_image/hindi_letter_44.png", sound: "/hindi_alphabet_audio/hindi_letter_44.mp3" },
  { letter: "स", image: "/hindi_alphabet_image/hindi_letter_45.png", sound: "/hindi_alphabet_audio/hindi_letter_45.mp3" },
  { letter: "ह", image: "/hindi_alphabet_image/hindi_letter_46.png", sound: "/hindi_alphabet_audio/hindi_letter_46.mp3" },
  { letter: "क्ष", image: "/hindi_alphabet_image/hindi_letter_47.png", sound: "/hindi_alphabet_audio/hindi_letter_47.mp3" },
  { letter: "त्र", image: "/hindi_alphabet_image/hindi_letter_48.png", sound: "/hindi_alphabet_audio/hindi_letter_48.mp3" },
  { letter: "ज्ञ", image: "/hindi_alphabet_image/hindi_letter_49.png", sound: "/hindi_alphabet_audio/hindi_letter_49.mp3" },



];

const Tracing = () => {
  const [index, setIndex] = useState(0);
  const currentAlphabet = alphabets[index];
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState({});

  // Fetch user tracing progress
  const fetchProgress = async () => {
    try {
      const response = await axios.get("/api/tracing/progress");
      const progressData = response.data.reduce((acc, item) => {
        acc[item.letter] = item;
        return acc;
      }, {});
      setProgress(progressData);
    } catch (error) {
      console.error("Failed to fetch tracing progress.", error);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  // Function to play sound
  const playSound = () => {
    const sound = new Howl({ src: [currentAlphabet.sound] });
    sound.play();
  };

  // Save Tracing Data
  //const saveTracingData = async (deviationScore, isCorrect) => {
  //  console.log(
  //    `📚 Saving data: Letter: ${currentAlphabet.letter}, Deviation: ${deviationScore}, Correct: ${isCorrect}`
  //  );
  //  const currentProgress = progress[currentAlphabet.letter] || {
  //    attempts: 0,
  //    correct_attempts: 0,
  //  };

  //  try {
  //    console.log("Sending data to backend...");
  //    await axios.post("/api/tracing/save", {
  //      letter: currentAlphabet.letter,
  //      deviation_score: deviationScore, // Placeholder for now
  //      attempts: currentProgress.attempts + 1,
  //      correct_attempts: isCorrect ? currentProgress.correct_attempts + 1 : currentProgress.correct_attempts,
  //      //correct_attempts: isCorrect ? 1 : 0, // ✅ Correctly set based on prediction
  //      //isCorrect, // ✅ Add this to avoid undefined issue
  //    });
  //    fetchProgress();
  //    console.log("Data sent successfully!");
  //  } catch (error) {
  //    console.error("Failed to save tracing data.", error);
  //  }
  //};


  const saveTracingData = async (deviationScore, isCorrect) => {
    console.log(
      `📚 Saving data: Letter: ${currentAlphabet.letter}, Deviation: ${deviationScore}, Correct: ${isCorrect}`
    );
  
    try {
      console.log("Sending data to backend...");
      await axios.post("/api/tracing/save", {
        letter: currentAlphabet.letter,
        deviation_score: deviationScore,
        isCorrect, // Let backend handle counting properly
      });
  
      // ✅ Fetch progress again (only if needed)
      fetchProgress();
  
      console.log("✅ Data sent successfully!!");
    } catch (error) {
      console.error("❌ Failed to save tracing data.", error);
    }
  };
  
  
  
  
  
  
  

  // Convert Canvas Data to Base64 for CNN
//const getCanvasData = () => {
//  if (canvasRef.current) {
//    const canvasData = canvasRef.current.getSaveData();
//    console.log("🖼️ Canvas Data:", canvasData.slice(0, 50)); // Print first 50 chars for debug
//    const canvasElement = document.createElement("canvas");
//    const ctx = canvasElement.getContext("2d");
//    const img = new Image();
//    img.src = canvasRef.current.canvasContainer.childNodes[1].toDataURL(); // Get the drawing as image data
//    return img.src.replace("data:image/png;base64,", ""); // Send only base64 data
//  }
//  return null;
//};

const [previewImage, setPreviewImage] = useState(null); // State for preview

const getCanvasData = () => {
  if (!canvasRef.current) return null;

  const originalCanvas = canvasRef.current.canvasContainer.childNodes[1]; // Get the actual drawing canvas
  const originalCtx = originalCanvas.getContext("2d");

  // Get Image Data
  const imageData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
  const pixels = imageData.data;

  let minX = originalCanvas.width, minY = originalCanvas.height, maxX = 0, maxY = 0;
  let hasDrawing = false;

  for (let y = 0; y < originalCanvas.height; y++) {
    for (let x = 0; x < originalCanvas.width; x++) {
      const index = (y * originalCanvas.width + x) * 4;
      const alpha = pixels[index + 3];

      if (alpha > 0) { // Check if pixel is part of the stroke
        hasDrawing = true;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!hasDrawing) {
    console.warn("❌ No valid strokes detected!");
    return null;
  }

  const width = maxX - minX;
  const height = maxY - minY;

  // Create a cropped canvas
  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");
  croppedCanvas.width = width;
  croppedCanvas.height = height;
  croppedCtx.putImageData(imageData, -minX, -minY);

  // Apply Gaussian Blur or Anti-Aliasing to reduce jagged edges
  croppedCtx.filter = 'blur(1px)'; // Apply a mild blur
  croppedCtx.drawImage(croppedCanvas, 0, 0, width, height, 0, 0, width, height);
  
  // Create a high-res canvas for smooth filling
  const highResCanvas = document.createElement("canvas");
  const highResCtx = highResCanvas.getContext("2d");
  highResCanvas.width = 256;
  highResCanvas.height = 256;

  // Set black background
  highResCtx.fillStyle = "black";
  highResCtx.fillRect(0, 0, 256, 256);

  // Draw the cropped (smoothed) image onto the high-res canvas
  highResCtx.drawImage(croppedCanvas, 0, 0, width, height, 0, 0, 256, 256);

  // Apply Thresholding (softening)
  const highResImageData = highResCtx.getImageData(0, 0, 256, 256);
  const highResPixels = highResImageData.data;

  // Soft thresholding for smooth transition
  for (let i = 0; i < highResPixels.length; i += 4) {
    const r = highResPixels[i];
    const g = highResPixels[i + 1];
    const b = highResPixels[i + 2];
    const avg = (r + g + b) / 3;
    
    // Gradually transition between black and white (no harsh thresholds)
    if (avg > 150) {
      highResPixels[i] = 255;   // R
      highResPixels[i + 1] = 255; // G
      highResPixels[i + 2] = 255; // B
      highResPixels[i + 3] = 255; // A (fully visible)
    } else if (avg > 50) {
      // Apply a smooth gradient from black to white for the middle range
      const blend = (avg - 50) / 100;
      highResPixels[i] = 255 * blend;   // R
      highResPixels[i + 1] = 255 * blend; // G
      highResPixels[i + 2] = 255 * blend; // B
      highResPixels[i + 3] = 255; // A (fully visible)
    } else {
      highResPixels[i] = 0;   // R
      highResPixels[i + 1] = 0; // G
      highResPixels[i + 2] = 0; // B
      highResPixels[i + 3] = 255; // A (fully visible)
    }
  }

  // Put the processed image back onto the high-res canvas
  highResCtx.putImageData(highResImageData, 0, 0);

  // Final downscale to 32x32
  const finalCanvas = document.createElement("canvas");
  const finalCtx = finalCanvas.getContext("2d");
  finalCanvas.width = 32;
  finalCanvas.height = 32;
  finalCtx.imageSmoothingEnabled = true;
  finalCtx.drawImage(highResCanvas, 0, 0, 256, 256, 0, 0, 32, 32);

  // Convert to Base64
  const base64Image = finalCanvas.toDataURL("image/png");
  setPreviewImage(base64Image);

  return base64Image.replace("data:image/png;base64,", "");
};







  // Handle Tracing Submission
  //const handleSubmit = () => {
  //  const deviationScore = Math.random() * 10; // Placeholder for now
  //  const isCorrect = deviationScore < 5; // Arbitrary threshold for success
  //  saveTracingData(deviationScore, isCorrect);
  //  canvasRef.current.clear();
  //};

  // Submit Tracing Data
const handleSubmit = async () => {
  const canvasData = getCanvasData(); // ✅ Already fixed to return canvas data
  console.log("🚀 Sending data for prediction:", {
    letter: currentAlphabet.letter,
    canvas_data: canvasData,
  });

  if (!canvasData) {
    console.error("❌ No canvas data available.");
    return;
  }

  try {
    console.log("🚀 Sending data for prediction...");
    const response = await axios.post("http://localhost:5001/predict", {
      letter: currentAlphabet.letter,
      canvas_data: canvasData, // ✅ Sending correct data to backend
    });

    const { deviation_score, isCorrect } = response.data;
    console.log("✅ Prediction received:", { deviation_score, isCorrect });
    
    // ✅ Save results in DB
    await saveTracingData(deviation_score, isCorrect);

    // Save results in DB
    //await axios.post("/api/tracing/save", {
    //  letter: currentAlphabet.letter,
    //  deviation_score, // ✅ This should now have a valid value
    //  attempts: (progress[currentAlphabet.letter]?.attempts || 0) + 1,
    //  correct_attempts: isCorrect
    //    ? (progress[currentAlphabet.letter]?.correct_attempts || 0) + 1
    //    : progress[currentAlphabet.letter]?.correct_attempts || 0,
    //});

    fetchProgress(); // Refresh progress
    canvasRef.current.clear(); // Clear canvas after submission
  } catch (error) {
    console.error("Prediction or saving error:", error);
  }
};

  

  // Navigation Functions
  const nextLetter = () => {
    setIndex((prev) => (prev + 1) % alphabets.length);
    canvasRef.current.clear();
  };

  const prevLetter = () => {
    setIndex((prev) => (prev - 1 + alphabets.length) % alphabets.length);
    canvasRef.current.clear();
  };

  return (
    <div style={styles.container}>
      {/* Title */}
      <motion.h1 style={styles.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        ✍️ Alphabet Tracing
      </motion.h1>

      <div style={styles.tracingContainer}>
        {/* Left: Letter & Sound */}
        <motion.div
          style={styles.letterBox}
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

        {/* Right: Tracing Area */}
        <div style={styles.drawingArea}>
          {/* Guide Letter for Tracing */}
          <div style={styles.guideLetter}>{currentAlphabet.letter}</div>

          {/* Drawing Canvas */}
          <CanvasDraw
            ref={canvasRef}
            brushColor="#FF4081"
            brushRadius={2}
            lazyRadius={2}
            canvasWidth={300}
            canvasHeight={300}
            hideGrid={true}
            style={styles.canvas}
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button style={styles.submitButton} whileTap={{ scale: 0.9 }} onClick={handleSubmit}>
        ✅ Submit
      </motion.button>

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

      {previewImage && (
  <div style={{ marginTop: "10px", textAlign: "center" }}>
    <h3>Preview</h3>
    <img src={previewImage} alt="Captured Tracing" style={{ border: "2px solid black", width: "64px", height: "64px" }} />
  </div>
)}


    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#C8E6C9",
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
  tracingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "30px",
  },
  letterBox: {
    background: "#FFF",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "4px 4px 10px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "250px",
  },
  letter: {
    fontSize: "5rem",
    color: "#673AB7",
    marginBottom: "10px",
  },
  image: {
    width: "120px",
    height: "120px",
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
  drawingArea: {
    position: "relative",
    width: "300px",
    height: "300px",
    backgroundColor: "#FFF3E0",
    borderRadius: "20px",
    boxShadow: "4px 4px 10px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  guideLetter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "8rem",
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.1)",
    zIndex: 1,
  },
  canvas: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  submitButton: {
    marginTop: "20px",
    fontSize: "1.2rem",
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#FF9800",
    color: "white",
    cursor: "pointer",
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

export default Tracing;