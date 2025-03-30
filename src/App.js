import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Alphabet from "./pages/Alphabet";
import Tracing from "./pages/Tracing";
import Games from "./pages/Games";
import Progress from "./pages/Progress";

import ImageProcessor from "./pages/ImageProcessor"; // Import the new page

// Import Game Components
import SoundMatch from "./pages/games/SoundMatch";
import ImageMatch from "./pages/games/ImageMatch";
import Quiz from "./pages/games/Quiz";
import MemoryMatch from "./pages/games/MemoryMatch";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alphabet" element={<Alphabet />} />
        <Route path="/tracing" element={<Tracing />} />
        <Route path="/games" element={<Games />} />
        <Route path="/progress" element={<Progress />} />
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

