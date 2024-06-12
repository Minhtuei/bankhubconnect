import axios, { AxiosInstance } from "axios";
class Http {
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: `${import.meta.env.VITE_API_URL}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
    }
}
const http = new Http().instance;
export default http;