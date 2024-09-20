import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5127/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers['X-Api-Key'] = `secret-key`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { data } = error.response;
            if (data.errors) {
                const validationMessages = Object.values(data.errors).flat().join(' ');
                toast.error(`Validation Error: ${validationMessages}`);
            } else {
                toast.error(`Error: ${data.message || error.message}`);
            }
        } else {
            toast.error(`Error: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;