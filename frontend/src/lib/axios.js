import axios from "axios"


export const axiosIncteance = axios.create({
    baseURL : "http://localhost:5001/api",
    withCredentials : true
})