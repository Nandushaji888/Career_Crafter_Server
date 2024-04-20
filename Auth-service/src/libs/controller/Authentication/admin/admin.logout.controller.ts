import { NextFunction, Request, Response } from "express";
import { clearAccessTokenFromCookie } from "../../../../utils/jwt/jwt";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const adminLogoutController = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.cookies);
    try {
      clearAccessTokenFromCookie("admin_accessToken", res);
      clearAccessTokenFromCookie("admin_accessToken", res);
      // res.clearCookie("admin_accessToken");
      res.json({ status: true, message: "Logout success" });
    } catch (err) {
      console.log(err, "errr");

      next(err);
    }
  };
  return adminLogoutController;
};
