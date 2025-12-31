import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
    }
    return req;
});

export default API;
