import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { recruiterLogin_useCase },
  } = dependencies;

  const loginRecruiterController = async (req: Request, res: Response) => {
    const { email, password } = req.body.values
    console.log(req.body);
    

    const response = await recruiterLogin_useCase(dependencies).executeFunction(
      email,
      password
    );

    if (!response?.status) {
      res.json({ status: false, message: response.message });
    } else {
      const { recruiter, accessToken, refreshToken } = response;
      // req.session.refreshToken = refreshToken;
      // const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      // res.cookie("recruiter-accessToken", accessToken, {
      //   expires: expirationDate,
      //   httpOnly: true,
      //   secure: true,
      // });
      res.cookie("recruiter_accessToken", accessToken, {
        maxAge: 300000,
        httpOnly: true,
        secure:true,
        sameSite:"strict"
      });
      res.cookie("recruiter_refreshToken", refreshToken, {
        maxAge: 3600000,
        httpOnly: true,
        secure:true,
        sameSite:"strict"
      });

      res.status(201).json({status:true,recruiter:recruiter})

    }
  };
  return loginRecruiterController;
};
