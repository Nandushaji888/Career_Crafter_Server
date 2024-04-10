import { Request, Response } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { recruiterLogin_useCase },
  } = dependencies;

  const loginRecruiterController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body.values;
    const response = await recruiterLogin_useCase(dependencies).executeFunction(
      email,
      password
    );

    if (!response?.status) {
      res.json({ status: false, message: response.message });
    } else {
      const { recruiter, accessToken, refreshToken } = response;
      res.cookie("recruiter_accessToken", accessToken, {
        maxAge: 300000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.cookie("recruiter_refreshToken", refreshToken, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      res.status(201).json({ status: true, recruiter: recruiter });
    }
  } catch (error) {
    console.log("error in loginRecruiterController", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  };
  return loginRecruiterController;
};
