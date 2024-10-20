// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './pages/CalendarPage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute'; // Import the private route
import './index.css';
import Header from './components/Header';

const App: React.FC = () => {
  const currentYear = new Date().getFullYear();
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>} />

                {/* Guard the calendar route with PrivateRoute */}
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="calendar" element={<Calendar year={currentYear}/>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;

