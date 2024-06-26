import axios from 'axios';
import e from 'express';
class http {
    private static instance: http;
    private constructor() { }
    public static getInstance(): http {
        if (!http.instance) {
            http.instance = new http();
        }
        return http.instance;
    }
    async get(url: string, accessToken: string) {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: url,
            headers: {
                'Accept': 'application/json',
                'x-client-id': `${process.env.CLIENT_ID}`,
                'x-secret-key': `${process.env.SECRET_KEY}`,
                'Authorization': accessToken
            }
        };
        return axios(config);
    }
    async post(url: string, data: any, accessToken: string) {
        let config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-client-id': `${process.env.CLIENT_ID}`,
                'x-secret-key': `${process.env.SECRET_KEY}`,
                'Authorization': accessToken ? accessToken : ''
            },
            data: data
        };

        return axios(config);
    }
}
export default http.getInstance();