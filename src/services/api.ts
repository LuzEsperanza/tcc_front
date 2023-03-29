import axios from "axios";

const api = axios.create({
    baseURL:'http://192.168.137.232:3000'
    
})
export default api;