import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import Instructions from './pages/Instructions';
import Practice from './pages/Practice';
import Progress from './pages/Progress';
import Results from './pages/Results';

function AppContent() {
  const location = useLocation();
  const isPracticePage = location.pathname.startsWith('/practice');

  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!isPracticePage && <Navbar />}
      <main className={isPracticePage ? "" : "container mx-auto px-4 py-8"}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:poseIndex" element={<Practice />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/results" element={<Results />} />
          
          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;