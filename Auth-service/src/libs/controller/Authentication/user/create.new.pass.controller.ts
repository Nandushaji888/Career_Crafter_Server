import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  // const { useCase: userNewPassword_useCase } = dependencies;
  const {
    useCase: { userNewPassword_useCase },
  } = dependencies;

  const userCreateNewPassController = async (req: Request, res: Response,next:NextFunction) => {
    try {

      console.log(userNewPassword_useCase);
      
      const { password } = req.body;

      if (!req.session?.userData?.email) {
        return res
          .status(404)
          .json({ status: false, message: "User session not found" });
      }
      const email = req.session?.userData?.email;
      const response = await userNewPassword_useCase(
        dependencies
      )?.executeFunction(email, password);
      if (response.status) {
        return res
          .status(200)
          .json({ status: true, message: response?.message });
      } else {
        return res
          .status(400)
          .json({ status: false, message: response?.message });
      }
    } catch (error) {
      console.log(error);
      next(error)

    }
  };
  return userCreateNewPassController;
};
