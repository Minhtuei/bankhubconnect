import http from "../../services/http.service";
import { Request, Response } from "express";
const connectController = {
    async createLink(req: Request, res: Response) {
        try {
            const response = await http.post(`${process.env.API_URL}/connect`, req.body);
            console.log(response.data);
        } catch (error) {
            res.status(error.response.status).send(error.response.data);
        }
    }
};
export { connectController };