import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api'; // Import the login API function
import Loader from '../components/Loader'; // Reusable Loader component
import './LoginPage.css'; // Import CSS for the login page

// Define form input types
interface LoginFormInputs {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setLoading(true);
        setMessage('');

        try {
            const response = await loginUser(data.username, data.password);
            setMessage('Login successful!');
            localStorage.setItem('token', response.token);
            localStorage.setItem('name', response.name);
            setTimeout(() => navigate('/calendar'), 1000); // Navigate to calendar
        } catch (error) {
            setMessage('Login failed. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <input
                    type="text"
                    placeholder="Username"
                    {...register('username', { required: 'Username is required' })}
                    className={`input-field ${errors.username ? 'input-error' : ''}`}
                />
                {errors.username && <p className="error-text">{errors.username.message}</p>}

                <input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: 'Password is required' })}
                    className={`input-field ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && <p className="error-text">{errors.password.message}</p>}

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {loading && <Loader />} {/* Display loader during login */}

            {message && <p className="message">{message}</p>}

            <p className="register-link">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;
