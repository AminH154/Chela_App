import axios from "axios"


export const axiosIncteance = axios.create({
    baseURL : "http://localhost:5000/api",
    withCredentials : true
})