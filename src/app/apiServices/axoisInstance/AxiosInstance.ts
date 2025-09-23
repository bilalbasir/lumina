

import axios from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode'; // npm install jwt-decode
import toast from 'react-hot-toast';
import { baseUrl } from '../baseUrl/BaseUrl';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: baseUrl,
});

// Function to check if token is expired
function isTokenExpired(token: string) {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (!decoded.exp) return true;
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        console.log("token expire error", error);

        return true; // Invalid token → consider expired
    }
}

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem("token");
                toast.error('Session expired. Please login again.');
                window.location.href = '/';
                return Promise.reject(new Error("Token expired"));
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor (fallback if backend returns 401)
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            toast.error('Session expired. Please login again.');
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
