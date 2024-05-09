import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

  export const verifyTkn = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token) return next(errorHandler(401,'Unauthorised'));

     jwt.verify(token,process.env.JWTSecret,(error,user)=>{
        if(error) return next(errorHandler(403,'Forbidden'));
        req.user =user;
        next();
      });
  
 }