import { Request, Response } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { adminLogin_useCase },
  } = dependencies;

  const loginAdminController = async (req: Request, res: Response) => {
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
        const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        res.cookie("admin_accessToken", accessToken, {
          expires: expirationDate,
          httpOnly: true,
          secure: true,
        });

        res
          .status(201)
          .json({ status: true, accessToken: accessToken, admin: admin });
      }
    } catch (error) {
      console.log("error in loginAdminController", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal servor error" });
    }
  };
  return loginAdminController;
};
