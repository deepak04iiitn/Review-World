import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js";
import Review from "../models/review.model.js";

export const test = (req , res) => {
    res.json({message : 'API is working'})
}


export const updateUser = async(req , res , next) => {

    // id coming from cookie => req.user
    // id coming from route request => req.params
    // both should be equal

    if(req.user.id !== req.params.userId)
    {
        return next(errorHandler(403 , 'You are not allowed to update this user!'));
    }

    if(req.body.password)
    {
        if(req.body.password.length < 6)
        {
            return next(errorHandler(400 , 'Password must be at least 6 characters!'));
        }

        req.body.password = bcryptjs.hashSync(req.body.password , 10);
    }

    if(req.body.username)
    {
        if(req.body.username.length < 7 || req.body.username > 20)
        {
            return next(errorHandler(400 , 'Username must be between 7 and 20 characters!'));
        }

        if(req.body.username.includes(' '))
        {
            return next(errorHandler(400 , 'Username cannot contain spaces!'));
        }

        if(req.body.username !== req.body.username.toLowerCase())
        {
            return next(errorHandler(400 , 'Username must be lowercase!'));
        }

        if(req.body.username.match(/^ [a-zA-Z0-9]+$/))
        {
            return next(errorHandler(400 , 'Username can only contain letters and numbers!'));
        }
    }

        try {
            
            const updatedUser = await User.findByIdAndUpdate(req.params.userId , {
                $set : {
                    username : req.body.username,
                    email : req.body.email,
                    profilePicture : req.body.profilePicture,
                    password : req.body.password,
                },
            } , { new : true });
            
            const { password , ...rest } = updatedUser._doc;
            res.status(200).json(rest);
            
        } catch (error) {
            next(error);
        }
}


export const deleteUser = async(req , res , next) => {

    // first check whether user is the owner of the account
    if(req.user.id !== req.params.userId)
    {
        return next(errorHandler(403 , 'You are not allowed to delete this account!'));
    }

    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
}


export const signout = async(req , res , next) => {

    try {
        res.clearCookie('access_token').status(200).json('User has benn signed out!');
    } catch (error) {
        next(error);
    }
    
}


export const getUserReviews = async (req, res, next) => {

    if (req.user.id === req.params.id) {

      try {
        const reviews = await Review.find({ userRef: req.params.id });
        res.status(200).json(reviews);
      } catch (error) {
        next(error);
      }

    } else {
      return next(errorHandler(401, 'You can only view your own reviews!'));
    }
    
  };



  export const getUser = async(req , res, next) => {

    try {

        const user = await User.findById(req.params.userId);

        if(!user)
        {
            return next(errorHandler(404 , 'User not found!'));
        }

        const { password , ...rest} = user._doc;

        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }

}