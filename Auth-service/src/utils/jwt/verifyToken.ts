import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createAccessToken } from "./jwt";
import { IUser } from "../interfaces/interface";
// import { IUser } from "../interface/interface";

// Extend Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const user_accessToken = req.cookies.user_accessToken;
  const user_refreshToken = req.cookies.user_refreshToken;


  


  jwt.verify(user_accessToken, process.env.ACCESS_SECRET_KEY || "", (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      console.log('err.name');
      console.log(err.name);
      
      if (err.name === 'JsonWebTokenError' && user_refreshToken) {
        
        jwt.verify(user_refreshToken, process.env.REFRESH_SECRET_KEY || "", (errRefresh: jwt.VerifyErrors | null, decodedRefresh: any) => {
          if (errRefresh) {
            return res.status(401).json({ status: false, message: 'Invalid Refresh Token' });
          }
          const user = decodedRefresh.user;
          const newAccessToken = createAccessToken(user, process.env.ACCESS_SECRET_KEY || "", "15m");
          res.cookie("user_accessToken", newAccessToken, {
            maxAge: 300000, //5 minutes in milliseconds
            httpOnly: true,
            secure: true,
            sameSite: "strict"
          });
          next();
        });
      } else {
        return res.status(401).json({ status: false, message: 'Unauthorized - No token Provided' });
      }
    } else {
      const decodedUser = decoded.user as IUser;
      req.user = decodedUser;
      next();
    }
  });
};

