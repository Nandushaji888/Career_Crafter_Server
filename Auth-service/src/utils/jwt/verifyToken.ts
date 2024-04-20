import { Request as ExpressRequest, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { AuthType, IAdmin, IRecruiter, IUser } from "../../interfaces/interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
    admin?: IAdmin;
    recruiter?: IRecruiter;
  }
}

interface DecodedToken {
  user?: IUser;
  admin?: IAdmin;
  recruiter?: IRecruiter;
}

export const verifyToken = (tokenType: AuthType) => {
  return (
    req: ExpressRequest,
    res: Response,
    next: NextFunction
  ) => {
    console.log(`reached verify ${tokenType}`);

    const accessToken = req.cookies[`${tokenType}_accessToken`];
    const refreshToken = req.cookies[`${tokenType}_refreshToken`];

    if (!refreshToken) {
      console.log("invalid refresh token");

      return res
        .status(401)
        .json({ status: false, message: "Invalid Refresh Token" });
    }

    jwt.verify(
      accessToken,
      process.env.ACCESS_SECRET_KEY || "",
      (err: VerifyErrors | null, decoded: DecodedToken | any) => {
        console.log("decoded");
        console.log(decoded);

        if (err) {
          console.log("err.name");
          console.log(err.name);

          if (err.name === "JsonWebTokenError" && refreshToken) {
            jwt.verify(
              refreshToken,
              process.env.REFRESH_SECRET_KEY || "",
              (
                errRefresh: VerifyErrors | null,
                decodedRefresh: DecodedToken | any
              ) => {
                if (errRefresh) {
                  return res
                    .status(401)
                    .json({ status: false, message: "Invalid Refresh Token" });
                }
                const user =
                  decodedRefresh.user ||
                  decodedRefresh.recruiter ||
                  decodedRefresh.admin;
                const newAccessToken = createUserAccessToken(
                  user,
                  process.env.ACCESS_SECRET_KEY || "",
                  "15m"
                );

                res.cookie(`${tokenType}_accessToken`, newAccessToken, {
                  maxAge: 300000, //5 minutes in milliseconds
                  httpOnly: true,
                  secure: true,
                  sameSite: "strict",
                });
                next();
              }
            );
          } else {
            console.log("unauthorized");

            return res.status(401).json({
              status: false,
              message: "Unauthorized - No token Provided",
            });
          }
        } else {
          switch (tokenType) {
            case AuthType.User:
              req.user = decoded.user as IUser;
              break;
            case AuthType.Admin:
              req.admin = decoded.admin as IAdmin;
              break;
            case AuthType.Recruiter:
              req.recruiter = decoded.recruiter as IRecruiter;
              break;
            default:
              break;
          }
          next();
        }
      }
    );
  };
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
