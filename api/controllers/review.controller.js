import Review from "../models/review.model.js";

export const createReview = async(req , res , next) => {

    try {
        
        const review = await Review.create(req.body);

        return res.status(201).json(review);
        
    } catch (error) {
        next(error);
    }
}