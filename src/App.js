import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Alphabet from "./pages/Alphabet";
import Tracing from "./pages/Tracing";
import Games from "./pages/Games";
import Progress from "./pages/Progress";

import Auth from "./pages/Auth";  
import PrivateRoute from "./PrivateRoute"; 

import ImageProcessor from "./pages/ImageProcessor"; // Import the new page

// Import Game Components
import SoundMatch from "./pages/games/SoundMatch";
import ImageMatch from "./pages/games/ImageMatch";
import Quiz from "./pages/games/Quiz";
import MemoryMatch from "./pages/games/MemoryMatch";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth />} />

        <Route path="/" element={<PrivateRoute user={user}><Home /></PrivateRoute>} />
        <Route path="/alphabet" element={<PrivateRoute user={user}><Alphabet /></PrivateRoute>} />
        <Route path="/tracing" element={<PrivateRoute user={user}><Tracing /></PrivateRoute>} />
        <Route path="/tracing/:letter" element={<PrivateRoute user={user}><Tracing /></PrivateRoute>} />
        <Route path="/games" element={<PrivateRoute user={user}><Games /></PrivateRoute>} />
        <Route path="/progress" element={<PrivateRoute user={user}><Progress /></PrivateRoute>} />
        <Route path="/image-processor" element={<ImageProcessor />} /> {/* New Route */}
        {/* Game Routes */}
        <Route path="/game/sound-match" element={<SoundMatch />} />
        <Route path="/game/image-match" element={<ImageMatch />} />
        <Route path="/game/quiz" element={<Quiz />} />
	      <Route path="/game/memory-match" element={<MemoryMatch />} />
      </Routes>
    </Router>
  );
}

export default App;

