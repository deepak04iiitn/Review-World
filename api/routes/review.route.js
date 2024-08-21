import express from 'express';
import { createReview, deleteReview, updateReview } from '../controllers/review.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create' , verifyToken , createReview);
router.delete('/delete/:id' , verifyToken , deleteReview);
router.post('/update/:id' , verifyToken , updateReview);

export default router;