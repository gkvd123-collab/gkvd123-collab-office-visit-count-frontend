import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
    const token = localStorage.getItem('token'); // Check if the token exists

    // If token exists, allow access to the route; otherwise, redirect to login
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
