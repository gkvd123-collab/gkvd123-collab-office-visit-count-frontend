// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './components/Calendar';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<Calendar year={currentYear} />} />
      </Routes>
    </Router>
  );
};

export default App;
