import { NextFunction, Request, Response } from "express";
import { clearAccessTokenFromCookie } from "../../../../utils/jwt/jwt";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const userLogoutController = (req: Request, res: Response,next:NextFunction) => {
    try {

      console.log('reached ');
      
      res.clearCookie("user_accessToken");
      res.clearCookie("user_refreshToken");
      req.session.userData = undefined
      res.json({ status: true, message: "Logout success" });
    } catch (err) {
      console.log(err, "errr");

      next(err)
    }
  };
  return userLogoutController;
};
