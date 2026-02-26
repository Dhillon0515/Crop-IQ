import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Landing from './pages/Landing';

// Quick placeholder pages for testing routing
const VoicePage = () => <div className="p-8 text-center text-gray-500 mt-10">AgroVoice Assistant Page (Coming Soon)</div>;
const AlertsPage = () => <div className="p-8 text-center text-gray-500 mt-10">Weather & Crop Alerts Page (Coming Soon)</div>;
const ProfilePage = () => <div className="p-8 text-center text-gray-500 mt-10">Farmer Profile Page (Coming Soon)</div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* MainLayout wraps all these routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/voice" element={<VoicePage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;