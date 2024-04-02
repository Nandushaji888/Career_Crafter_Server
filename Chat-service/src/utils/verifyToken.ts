import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IRecruiter, IUser } from "./interface";

// Extend Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser | IRecruiter;
    }
  }
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {


  const user_accessToken = req.cookies.user_accessToken ? req.cookies.user_accessToken :req.cookies.recruiter_accessToken
  const user_refreshToken = req.cookies.user_refreshToken ? req.cookies.user_refreshToken : req.cookies.recruiter_refreshToken 


console.log('in verify token');




  jwt.verify(user_accessToken, process.env.ACCESS_SECRET_KEY || "", (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {

      console.log('err');
      console.log(err);
      
      if (err.name === 'JsonWebTokenError' && user_refreshToken) {
        
        jwt.verify(user_refreshToken, process.env.REFRESH_SECRET_KEY || "", (errRefresh: jwt.VerifyErrors | null, decodedRefresh: any) => {
          if (errRefresh) {
            return res.status(401).json({ status: false, message: 'Invalid Refresh Token' });
          }
          const user = decodedRefresh.user;
          
          
          const newAccessToken = createAccessToken(user, process.env.ACCESS_SECRET_KEY || "", "5m");
          res.cookie("user_accessToken", newAccessToken, {
            maxAge: 300000, //5 minutes in milliseconds
            httpOnly: true,
            secure: true,
            sameSite: "strict"
          });
          req.user = decodedRefresh.user;
          next();
        });
      } else {
        return res.status(401).json({ status: false, message: 'Unauthorized - No token Provided' });
      }
    } else {
      const decodedUser = decoded.user as IUser | IRecruiter;
      req.user = decodedUser;      
      next();
    }
  });
};


export const createAccessToken = (
    user: any, 
    accessTokenSecretKey: string, 
    expiration: string 
  ) => {
    const token = jwt.sign({ user }, accessTokenSecretKey, {
      expiresIn: expiration, 
    });
    return token;
  };

