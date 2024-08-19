import express from 'express';
import searchController from '../controller/search/searchController.js';

const router = express.Router();

router.get('', searchController);

export default router;