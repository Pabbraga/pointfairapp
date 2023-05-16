import axios from "axios";

const api = axios.create({
    baseURL: 'https://pointfair.onrender.com',
    timeout: 1000
});

export default api;