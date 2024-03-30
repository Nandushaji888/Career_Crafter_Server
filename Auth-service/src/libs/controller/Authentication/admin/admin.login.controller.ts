import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { adminLogin_useCase },
  } = dependencies;

  const loginAdminController = async (req: Request, res: Response) => {
    const { email, password } = req.body.values
    // console.log('hereeeeeee');
    
    // console.log(req.body);
    

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
      res.cookie("admin-accessToken", accessToken, {
        expires: expirationDate,
        httpOnly: true,
        secure: true,
      });

      res.status(201).json({status:true,accessToken:accessToken,admin:admin})

    }
  };
  return loginAdminController;
};
