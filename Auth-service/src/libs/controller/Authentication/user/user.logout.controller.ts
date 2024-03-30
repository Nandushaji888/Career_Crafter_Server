import { Request, Response } from "express";
import { clearAccessTokenFromCookie } from "../../../../utils/jwt/jwt";

export default (dependencies: any) => {
  const userLogoutController = (req: Request, res: Response) => {
    try {

      console.log('reached ');
      
      res.clearCookie("user_accessToken");
      res.clearCookie("user_refreshToken");
      req.session.userData = undefined
      res.json({ status: true, message: "Logout success" });
    } catch (err) {
      console.log(err, "errr");

      res.json(err);
    }
  };
  return userLogoutController;
};
