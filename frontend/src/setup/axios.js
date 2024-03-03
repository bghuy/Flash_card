import axios from "axios";
import { toast } from 'react-toastify';
import { logout } from "../services/userService";

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status || 500;

    switch (status) {
        // authentication (token related issues)
        case 401: {
            console.log(status);
            toast.error("Unauthorized the user, please login ...");
            await logout();
            window.location.href = "/login"; // Reload the page after logout
            return Promise.reject(error);
        }
        // forbidden (permission related issues)
        case 403: {
            toast.error("you don't have permission to access this resource ....");
            break;
        }
        // Other error cases can be handled similarly
        default: {
            break;
        }
    }
    return Promise.reject(error);
});

instance.defaults.withCredentials = true;

export default instance;
