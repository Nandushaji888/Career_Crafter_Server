import { Request, Response } from "express";
import { clearAccessTokenFromCookie } from "../../../../utils/jwt/jwt";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const recruiterLogoutController = (req: Request, res: Response) => {
    try {
      res.clearCookie("recruiter_accessToken");
      res.clearCookie("recruiter_refreshToken");
      req.session.recruiterData = undefined

      res.json({ status: true, message: "Logout success" });
    } catch (err) {
      console.log(err, "errr");

      res.json(err);
    }
  };
  return recruiterLogoutController;
};
