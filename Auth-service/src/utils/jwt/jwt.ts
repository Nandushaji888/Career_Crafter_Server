import jwt from "jsonwebtoken";
import { Response } from "express";
import { IAdmin, IRecruiter, IUser } from "../../interfaces/interface";

export const createUserAccessToken = (
  user: IUser,
  accessTokenSecretKey: string,
  expiration: string
) => {
  const token = jwt.sign({ user }, accessTokenSecretKey, {
    expiresIn: expiration,
  });
  return token;
};

export const createRecruiterAccessToken = (
  user: IRecruiter,
  accessTokenSecretKey: string,
  expiration: string
) => {
  const token = jwt.sign({ user }, accessTokenSecretKey, {
    expiresIn: expiration,
  });
  return token;
};

export const createAdminAccessToken = (
  user: IAdmin,
  accessTokenSecretKey: string,
  expiration: string
) => {
  const token = jwt.sign({ user }, accessTokenSecretKey, {
    expiresIn: expiration,
  });
  return token;
};

export const createUserRefreshToken = (
  user: IUser ,
  refreshTokenSecretKey: string,
  expiration: string
) => {
  return jwt.sign({ user }, refreshTokenSecretKey, {
    expiresIn: expiration,
  });
};

export const createRecruiterRefreshToken = (
  user: IRecruiter,
  refreshTokenSecretKey: string,
  expiration: string
) => {
  return jwt.sign({ user}, refreshTokenSecretKey, {
    expiresIn: expiration,
  });
};

export const createAdminRefreshToken = (
  user: IAdmin,
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
