import express from 'express';
const router = express.Router();
import { connectController } from '../../controllers/connect/index';
router.get('/connect', connectController.createLink);
export default router;