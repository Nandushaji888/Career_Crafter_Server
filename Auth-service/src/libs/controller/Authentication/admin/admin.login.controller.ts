import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { adminLogin_useCase },
  } = dependencies;

  const loginAdminController = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const { email, password } = req.body.values;

      const response = await adminLogin_useCase(dependencies).executeFunction(
        email,
        password
      );

      if (!response?.status) {
        res.json({ status: false, message: response.message });
      } else {
        const { admin, accessToken, refreshToken } = response;
        req.session.refreshToken = refreshToken;

        res.cookie("admin_accessToken", accessToken, {
          maxAge: 3600000,
          httpOnly: true,
          secure:true,
          sameSite:"strict"
        });
        res.cookie("admin_refreshToken", refreshToken, {
          maxAge: 7200000,
          httpOnly: true,
          secure:true,
          sameSite: "strict",
        });
        
        res
          .status(201)
          .json({ status: true,  admin: admin });
      }
    } catch (error) {
      console.log("error in loginAdminController", error);
      next(error);

    }
  };
  return loginAdminController;
};
