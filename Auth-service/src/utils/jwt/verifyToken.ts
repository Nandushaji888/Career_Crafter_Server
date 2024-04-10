import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IAdmin, IRecruiter, IUser } from "../../interfaces/interface";
import { TokenType } from "../../interfaces/enum";

declare global {
    namespace Express {
      interface Request {
        user?: IUser | IAdmin | IRecruiter;
      }
    }
  }

  function determineTokenType(req: Request): TokenType {
    if (req.user && req.user.type === 'admin') {
       return TokenType.ADMIN;
    } else if (req.user && req.user.type === 'recruiter') {
       return TokenType.RECRUITER;
    } else {
       return TokenType.USER;
    }
   }

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  console.log("reached verify token");

  const tokenType = determineTokenType(req);
console.log('tokenType');
console.log(tokenType);

  const accessToken = req.cookies.user_accessToken || req.cookies.admin_accessToken || req.cookies.recruiter_accessToken
  const refreshToken = req.cookies.user_refreshToken || req.cookies.recruiter_refreshToken ||req.cookies.admin_refreshToken

  if (!refreshToken) {
    console.log("invalid refresh token");

    return res
      .status(401)
      .json({ status: false, message: "Invalid Refresh Token" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_SECRET_KEY || "",
    (err: jwt.VerifyErrors | null, decoded: any) => {
      console.log("decoded");
      console.log(decoded);

      if (err) {
        console.log("err.name");
        console.log(err.name);

        if (err.name === "JsonWebTokenError" && refreshToken) {
          jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY || "",
            (errRefresh: jwt.VerifyErrors | null, decodedRefresh: any) => {
              if (errRefresh) {
                return res
                  .status(401)
                  .json({ status: false, message: "Invalid Refresh Token" });
              }
              const user = decodedRefresh.user||decodedRefresh.recruiter||decodedRefresh.admin
              const newAccessToken = createUserAccessToken(
                user,
                process.env.ACCESS_SECRET_KEY || "",
                "15m"
              );


              res.cookie(tokenType, newAccessToken, {
                maxAge: 300000, //5 minutes in milliseconds
                httpOnly: true,
                secure: true,
                sameSite: "strict",
              });
              next();
            }
          );
        } else {
          return res
            .status(401)
            .json({
              status: false,
              message: "Unauthorized - No token Provided",
            });
        }
      } else {
        const decodedUser = decoded.user as IUser | IAdmin | IRecruiter;
        req.user = decodedUser;
        next();
      }
    }
  );
};



export const createUserAccessToken = (
    user: IUser | IRecruiter | IAdmin, 
    accessTokenSecretKey: string, 
    expiration: string 
  ) => {
    const token = jwt.sign({ user }, accessTokenSecretKey, {
      expiresIn: expiration, 
    });
    return token;
  };