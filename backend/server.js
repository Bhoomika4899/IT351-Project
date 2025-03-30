// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const tracingRoutes = require('./routes/tracingRoutes');
const gameRoutes = require('./routes/gameRoutes');
const progressRoutes = require('./routes/progressRoutes');
const pythonRoutes = require('./routes/pythonRoutes'); // Add python routes

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
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middleware to parse JSON
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);          // User Registration & Login
app.use('/api/tracing', tracingRoutes);    // Tracing Data APIs
app.use('/api/games', gameRoutes);         // Game Data APIs
app.use('/api/progress', progressRoutes);  // Progress APIs
app.use('/api', pythonRoutes);             // Register python routes

// Sample Route
app.get('/', (req, res) => {
  res.send('✅ API is running... Backend connected successfully!');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
