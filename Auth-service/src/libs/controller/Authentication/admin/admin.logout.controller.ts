import { Request, Response } from "express";
import { clearAccessTokenFromCookie } from "../../../../utils/jwt/jwt";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const adminLogoutController = (req: Request, res: Response) => {
    console.log(req.cookies);
    try {
      clearAccessTokenFromCookie("admin-accessToken", res);
      res.clearCookie("admin_accessToken");
      res.json({ status: true, message: "Logout success" });
    } catch (err) {
      console.log(err, "errr");

      res.json(err);
    }
  };
  return adminLogoutController;
};
