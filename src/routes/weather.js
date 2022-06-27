import { Router } from 'express';
import { weatherController } from '../controllers/index.js';

const router = Router();

router.use('/', weatherController.getWeather);

export default router;
