import express from 'express';
const connectRouter = express.Router();
import { connectController } from '../../controllers/connect/index';
connectRouter.get('/connect', connectController.createLink);
connectRouter.post('/exchange-token', connectController.exchangeToken);
connectRouter.get('/transaction', connectController.getTransaction);
connectRouter.get('/access-token', connectController.getAccessToken);
export default connectRouter;