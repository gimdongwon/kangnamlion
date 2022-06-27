import { Router } from 'express';
import { upbitController } from '../controllers/index.js';

const router = Router();

router.use('/getMarketPrice', upbitController.getUpbitMarketPrice);

export default router;
