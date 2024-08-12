import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
        },
        category : {
            type: String,
            default: 'uncategorized',
            required : true,
        },
        review : {
            type : String,
            required : true,
        },
        rating : {
            type : Number,
            required : true,
        },
        imageUrls: {
            type: Array,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;