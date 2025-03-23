const express = require('express');
const { saveTracingData, getTracingData } = require('../controllers/tracingController');
//const { protect } = require('../middleware/authMiddleware');  UNCOMMENT THIS LATER****

const router = express.Router();

// Save Tracing Data
//router.post('/save', protect, saveTracingData);  UNCOMMENT THIS LATER****
router.post('/save', saveTracingData);  //REMOVE THIS LATER***
// Get Tracing Progress
//router.get('/progress', protect, getTracingData);  UNCOMMENT THIS LATER****
router.get('/progress', getTracingData);  //REMOVE THIS LATER***
module.exports = router;
