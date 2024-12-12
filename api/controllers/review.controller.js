import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createReview = async(req , res , next) => {

    try {
        
        const review = await Review.create(req.body);

        // Find the user and increment their number of reviews
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { numberOfReviews: 1 }
        });

        return res.status(201).json(review);
        
    } catch (error) {
        next(error);
    }
}


export const deleteReview = async(req , res , next) => {

    const review = await Review.findById(req.params.id);

    if(!review)
    {
        return next(errorHandler(404 , 'Review not found!'));
    }

    if(req.user.id !== review.userRef)
    {
        return next(errorHandler(401 , 'You can only delete your own review!'));
    }

    try {

        await Review.findByIdAndDelete(req.params.id);

        // Find the user and decrement their number of reviews
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { numberOfReviews: -1 }
        });

        res.status(200).json('Review has been deleted!');

    } catch (error) {
        next(error);
    }
}


export const updateReview = async(req , res , next) => {

    const review = await Review.findById(req.params.id);

    if(!review)
    {
        return next(errorHandler(404 , 'Review not found!'));
    }

    if(req.user.id !== review.userRef)
    {
        return next(errorHandler(401 , 'You can only update your own review!'));
    }

    try {

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new : true }
        )

        res.status(200).json(updatedReview);

    } catch (error) {
        next(error);
    }
}


export const getReview = async(req , res , next) => {

    try {

        const review = await Review.findById(req.params.id);

        if(!review)
        {
            return next(errorHandler(404 , 'Review not found!'));
        }

        res.status(200).json(review);    
        
    } catch (error) {
        next(error);
    }
}


export const getAllReviews = async (req, res, next) => {

    try {

      const reviews = await Review.find().sort({createdAt:-1});

      if(!reviews)
      {
        return next(errorHandler(404 , 'Reviews not found!'));
      }

      res.status(200).json(reviews);

    } catch (error) {
      next(error);
    }
    
  };



  export const likeReview = async (req, res, next) => {

    try {
        const review = await Review.findById(req.params.revId);

        if (!review) {
            return next(errorHandler(404, 'Review not found'));
        }

        const userId = req.user.id; 

        if (!review.likes.includes(userId)) {
            review.likes.push(userId);
            review.numberOfLikes += 1;

            const dislikeIndex = review.dislikes.indexOf(userId);

            if (dislikeIndex !== -1) {
                review.dislikes.splice(dislikeIndex, 1);
                review.numberOfDislikes -= 1;
            }

            await review.save();

            res.status(200).json({ message: 'Review liked successfully', likes: review.numberOfLikes, dislikes: review.numberOfDislikes });

        } else {
            res.status(400).json({ message: 'You have already liked this review' });
        }
    } catch (error) {
        next(error);
    }
}

export const dislikeReview = async (req, res, next) => {

    try {
        const review = await Review.findById(req.params.revId);

        if (!review) {
            return next(errorHandler(404, 'Review not found'));
        }

        const userId = req.user.id; 

        if (!review.dislikes.includes(userId)) {
            review.dislikes.push(userId);
            review.numberOfDislikes += 1;

            const likeIndex = review.likes.indexOf(userId);

            if (likeIndex !== -1) {
                review.likes.splice(likeIndex, 1);
                review.numberOfLikes -= 1;
            }

            await review.save();

            res.status(200).json({ message: 'Review disliked successfully', likes: review.numberOfLikes, dislikes: review.numberOfDislikes });

        } else {
            res.status(400).json({ message: 'You have already disliked this review' });
        }
    } catch (error) {
        next(error);
    }
}