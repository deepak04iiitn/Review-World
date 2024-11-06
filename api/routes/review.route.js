import express from 'express';
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from '../controllers/review.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create' , verifyToken , createReview);
router.delete('/delete/:id' , verifyToken , deleteReview);
router.post('/update/:id' , verifyToken , updateReview);
router.get('/get/:id' , getReview);
router.get('/getall', getAllReviews);

export default router;