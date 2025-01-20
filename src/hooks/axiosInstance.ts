import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ailibi.click/api/v1',
    withCredentials: true, 
    headers: {
        //'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': '1', 
        //'X-CSRFTOKEN': ' I5aJ6BUAURT4dCz0nj0arYnmkjVTQrFT',
    }
});


axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;