import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure consistent user object
        req.user = {
            _id: decoded.id,  // Normalize to _id
            ...decoded
        };
        
        next();
    } catch (error) {
        return next(errorHandler(401, 'Unauthorized'));
    }
};