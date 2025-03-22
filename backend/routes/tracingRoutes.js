const express = require('express');
const { saveTracingData, getTracingData } = require('../controllers/tracingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Save Tracing Data
router.post('/save', protect, saveTracingData);

// Get Tracing Progress
router.get('/progress', protect, getTracingData);

module.exports = router;
