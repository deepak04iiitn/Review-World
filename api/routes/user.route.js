import express from 'express';
import {deleteUser, getUserReviews, signout, test, updateUser, getUser, getUserProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.get('/profile', verifyToken, getUserProfile);  // Move this BEFORE the /:userId route
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);
router.get('/reviews/:id', verifyToken, getUserReviews);
router.get('/:userId', getUser);  // This generic route should come last

export default router;