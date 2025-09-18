import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { RegionProvider } from './contexts/RegionContext';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import MainLayout from './pages/MainLayout';

function App() {
  return (
    <LanguageProvider>
      <RegionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/main/*" element={<MainLayout />} />
          </Routes>
        </Router>
      </RegionProvider>
    </LanguageProvider>
  );
}

export default App;