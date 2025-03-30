// routes/pythonRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to handle /predict requests
router.post('./predict', async (req, res) => {
  try {
    // Send the image data to Python Flask server running on port 5001
    const response = await axios.post('http://localhost:5001/predict', req.body, {
      headers: { 'Content-Type': 'application/json' },
    });

    // Send the response from Python back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error in communication with Python server:", error);
    res.status(500).json({ message: 'Error communicating with Python server' });
  }
});

module.exports = router;
