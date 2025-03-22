const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const tracingRoutes = require('./routes/tracingRoutes');
const gameRoutes = require('./routes/gameRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log(`❌ MongoDB connection error: ${err.message}`));

// Initialize express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);          // User Registration & Login
app.use('/api/tracing', tracingRoutes);    // Tracing Data APIs
app.use('/api/games', gameRoutes);         // Game Data APIs
app.use('/api/progress', progressRoutes);  // Progress APIs

// Sample Route
app.get('/', (req, res) => {
  res.send('✅ API is running... Backend connected successfully!');
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
