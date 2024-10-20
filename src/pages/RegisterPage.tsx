import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api'; // Import the register API function
import Loader from '../components/Loader'; // Reusable Loader component
import './RegisterPage.css'; // Import CSS for the register page

// Define form input types
interface RegisterFormInputs {
    username: string;
    password: string;
    name: string;
}

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    // Form submission handler
    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        setLoading(true);
        setMessage('');

        try {
            await registerUser(data.username, data.password, data.name);
            setMessage('Registration successful!');
            setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
        } catch (error) {
            setMessage('Error registering user. Please try again.');
            console.error('Registration error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <input
                    type="text"
                    placeholder="Name"
                    {...register('name', { required: 'Name is required' })}
                    className={`input-field ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <p className="error-text">{errors.name.message}</p>}

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

                <button type="submit" className="register-button" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            {loading && <Loader />} {/* Loader during registration */}

            {message && <p className="message">{message}</p>}

            <p className="login-link">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;
