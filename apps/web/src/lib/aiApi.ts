import axios from "axios";

export const aiService = axios.create({
    baseURL : "http://localhost:8000",
    withCredentials:true,
    headers:{"Content-Length" : "application/json"}
})