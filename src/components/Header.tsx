import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from localStorage
        navigate('/login'); // Redirect to login page
    };

    // Example profile icon URL (you can replace it with any URL you prefer)
    const username = localStorage.getItem('name'); // You can set this dynamically based on user data

    return (
        <header className="header">
            <div className="profile-container">
                <img
                    src='../../public/profile.png' // Use the profile icon URL
                    alt="Profile"
                    className="profile-icon"
                />
                <span className="username">Welcome, {username}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </header>
    );
};

export default Header;
