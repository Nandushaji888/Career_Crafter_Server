import jwt from "jsonwebtoken";
import { Response } from "express";
import { IRecruiter, IUser } from "../../interfaces/interface";

export const createAccessToken = (
  user: IUser | IRecruiter,
  accessTokenSecretKey: string,
  expiration: string
) => {
  const token = jwt.sign({ user }, accessTokenSecretKey, {
    expiresIn: expiration,
  });
  return token;
};

export const createRefreshToken = (
  user: IUser | IRecruiter,
  refreshTokenSecretKey: string,
  expiration: string
) => {
  return jwt.sign({ user }, refreshTokenSecretKey, {
    expiresIn: expiration,
  });
};

export const clearAccessTokenFromCookie = (
  cookieName: string,
  res: Response
) => {
  res.cookie(cookieName, {
    httpOnly: false,
    secure: false,
    signed: false,
    maxAge: 0,
  });
};
