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
        subcategory : {
            type : String,
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
        userEmail : {
            type: String,
            required: true,
        },
        userUsername : {
            type: String,
            required: true,
        },
        userTitle : {
            type: String,
            required: true,
        },
        reviewerId : {
            type: String,
            required: true,
        },
        userRef: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        
        numberOfLikes: {
            type: Number,
            default: 0,
        },
        
        dislikes: {
            type: Array,
            default: [],
        },
          
        numberOfDislikes: {
            type: Number,
            default: 0,
        },

    },
    { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;