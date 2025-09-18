// src/App.js
import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import html2canvas from 'html2canvas'; // Corrected: Changed 'html-to-canvas' to 'html2canvas'

import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import AdminDashboard from './pages/AdminDashboard';
import { PostsProvider } from './context/PostsContext';
import Footer from './components/Footer'; // Import the new Footer component

function App() {
  const isSpeechRecognitionSupported = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  const recognitionRef = useRef(null);

  const takeScreenshot = () => {
    const element = document.body;

    html2canvas(element, {
      useCORS: true,
      scale: window.devicePixelRatio,
    }).then(canvas => {
      const imageDataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageDataURL;
      link.download = `blog-screenshot-${new Date().toISOString()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("Screenshot taken and downloaded!");
    }).catch(err => {
      console.error("Error taking screenshot:", err);
    });
  };

  const screenshotKeyword = "take snapshot";

  useEffect(() => {
    if (!isSpeechRecognitionSupported) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("Speech detected:", transcript);

      if (transcript.includes(screenshotKeyword)) {
        console.log(`Keyword "${screenshotKeyword}" detected. Taking screenshot...`);
        takeScreenshot();
      }
    };

    recognitionRef.current.onend = () => {
      console.log("Speech recognition ended. Restarting...");
      // Add a small delay before attempting to restart to prevent InvalidStateError
      setTimeout(() => {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error("Error restarting speech recognition:", error);
        }
      }, 500); // 500ms delay
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === 'not-allowed' || event.error === 'permission-denied') {
        alert("Microphone permission denied. Please allow microphone access to use voice commands.");
      }
    };

    try {
      recognitionRef.current.start();
      console.log("Speech recognition started. Listening for commands...");
    } catch (error) {
      console.error("Error starting speech recognition on mount:", error);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        console.log("Speech recognition stopped.");
      }
    };
  }, []);


  return (
    <PostsProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 font-inter antialiased text-gray-800"> {/* Added flex-col */}
          {/* Navigation */}
          <nav className="bg-black shadow-md py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors duration-200">
                React Blog
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/admin" className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                  Admin
                </Link>
                {/* Screenshot Button */}
                <button
                  onClick={takeScreenshot}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow-md text-sm"
                  title="Click to take a screenshot of the page"
                >
                  Screenshot
                </button>
              </div>
            </div>
          </nav>

          {/* Main content area, grows to fill space */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/post/:postId" element={<SinglePostPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer /> {/* Render the Footer component here */}
        </div>
      </Router>
    </PostsProvider>
  );
}

export default App;
