import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.jsx'; // Assuming your Home page is in pages folder
import Register from './pages/register.jsx';
import Login from './pages/login.jsx';
import './App.css';
import Feed from './pages/feed.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main Home Route */}
          <Route path="/" element={<Home />} />

          {/* Registration Route */}
          <Route path="/register" element={<Register />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          <Route path="/feed" element={<Feed />} />
          
          {/* 404 Page (Optional: Redirects unknown links to Home) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;