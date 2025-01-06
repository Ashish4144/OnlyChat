import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE_ENV === "development" ? 'http://localhost:3000/api' : "/api" ,   //if development localhost else the url/api
    withCredentials: true,                 //send cookies in all requests. 
});