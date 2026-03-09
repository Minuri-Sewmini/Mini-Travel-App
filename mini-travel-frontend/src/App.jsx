import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Registration Route */}
        <Route path="/register" element={<Register />} />
        
        {/* Default Home Route */}
        <Route path="/" element={
          <div className="text-center mt-20">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to Mini Travel 🌍</h1>
            <a href="/register" className="text-xl text-blue-500 underline">Go to Register</a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;