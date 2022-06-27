import express from 'express';
import upbitRouter from './upbit.js';
import weahterRouter from './weather.js';
import openseaRouter from './opensea.js';

const router = express.Router();

router.use('/upbit', upbitRouter);
router.use('/weather', weahterRouter);
router.use('/opensea', openseaRouter);

export default router;
