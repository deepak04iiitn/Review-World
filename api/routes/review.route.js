import express from 'express';
import { createReview, deleteReview, dislikeReview, getAllReviews, getReview, likeReview, updateReview } from '../controllers/review.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create' , verifyToken , createReview);
router.delete('/delete/:id' , verifyToken , deleteReview);
router.post('/update/:id' , verifyToken , updateReview);
router.get('/get/:id' , getReview);
router.get('/getall', getAllReviews);
router.put('/likeReview/:revId' , verifyToken , likeReview);                  
router.put('/dislikeReview/:revId' , verifyToken , dislikeReview);

export default router;