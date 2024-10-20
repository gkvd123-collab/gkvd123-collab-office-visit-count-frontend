import axios, { AxiosError } from 'axios';

// Define a type for the error response
interface ErrorResponse {
    message: string;
}

// Set the base URL for the API
const API_BASE_URL = 'https://office-visit-count-backend.onrender.com/api';
// const API_BASE_URL = 'http://localhost:5000/api';


// Define types for the User and Date objects
export interface User {
    id: string;
    username: string;
    name: string;
}

export interface DateEntry {
    _id: string;
    date: string; // Store date as ISO string
    userId: string;
    name: string;
}

// Register a new user
export const registerUser = async (username: string, password: string, name: string): Promise<string> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            username,
            password,
            name,
        });
        return response.data.message; // Return success message
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>; // Assert error type
        throw err.response?.data.message || 'Registration failed'; // Handle error
    }
};

// Login a user
export const loginUser = async (username: string, password: string): Promise<{ token: string,name:string }> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            username,
            password,
        });
        return response.data; // Return response containing the token
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>; // Assert error type
        throw err.response?.data.message || 'Login failed'; // Handle error
    }
};

// Fetch dates for the authenticated user
export const fetchDates = async (token: string): Promise<DateEntry[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dates`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Return the array of dates
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>; // Assert error type
        throw err.response?.data.message || 'Fetching dates failed'; // Handle error
    }
};

// Create a new date
export const createDate = async (date: string, token: string): Promise<DateEntry> => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/dates`,
            { date },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data; // Return the created date
    } catch (error) {
        const err = error as AxiosError<ErrorResponse>; // Assert error type
        throw err.response?.data.message || 'Creating date failed'; // Handle error
    }
};
