import http from "../../services/http.service";
import { Request, Response } from "express";
import db from "../../services/database.service";
const connectController = {
    async createLink(req: Request, res: Response) {
        try {
            const data = JSON.stringify({
                "scopes": "transaction",
                "redirectUri": `${process.env.REDIRECT_URI}`,
                "language": "vi"
            })
            const response = await http.post(`${process.env.BASE_URL}/grant/token`, data, "");
            const grantToken = response.data.grantToken;
            const link = `${process.env.BANKHUB_LINK}?grantToken=${grantToken}&redirectUri=${process.env.REDIRECT_URI}&iframe=true`;
            return res.status(200).json(link);
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },
    async exchangeToken(req: Request, res: Response) {
        try {
            const publicToken = req.body.publicToken;
            const response = await http.post(`${process.env.BASE_URL}/grant/exchange`, {
                publicToken,
            }, "");
            const accessToken = response.data.accessToken;
            await db.insertToken(accessToken);
            return res.status(200).json({ message: "Token exchanged successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    }
    ,
    async getTransaction(req: Request, res: Response) {
        try {
            const accessToken = await db.getLatestToken();
            if (!accessToken) {
                return res.status(400).json({ message: "accessToken is required" });
            }
            const response = await http.get(`${process.env.BASE_URL}/transactions`, accessToken);
            return res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },
    async createQRCode(req: Request, res: Response) {
        try {
            const accessToken = await db.getLatestToken();
            if (!accessToken) {
                return res.status(400).json({ message: "accessToken is required" });
            }
            const data = JSON.stringify({
                "amount": 2000,
                "description": "string",
                "referenceNumber": "1"
            });
            const response = await http.post(`${process.env.BASE_URL}/qr-code`, data, accessToken);
            return res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    },
    async getAccessToken(req: Request, res: Response) {
        try {
            const accessToken = await db.getLatestToken();
            return res.status(200).json({ accessToken });
        } catch (error) {
            console.error(error);
            return res.status(500).json(error);
        }
    }
};
export { connectController };


