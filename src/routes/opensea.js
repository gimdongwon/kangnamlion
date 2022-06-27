import { Router } from 'express';
import { openseaController } from '../controllers/index.js';

const router = Router();

router.use('/', openseaController.getOpenseaInfo);

export default router;
