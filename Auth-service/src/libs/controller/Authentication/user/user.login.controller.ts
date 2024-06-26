import { Request, Response,NextFunction } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  
  const {
    useCase: { userLogin_useCase },
  } = dependencies;

  const loginUserController = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const { email, password } = req.body.values;
    console.log(req.body);

    const response = await userLogin_useCase(dependencies)?.executeFunction(
      email,
      password
    );

    if (!response?.status) {
      res.json({ status: false, message: response.message });
    } else {
      const { user, user_accessToken, user_refreshToken } = response;

      req.session.refreshToken = user_refreshToken;
      res.cookie("user_accessToken", user_accessToken, {
        maxAge: 300000,
        httpOnly: true,
        secure:true,
        sameSite:"strict"
      });
      res.cookie("user_refreshToken", user_refreshToken, {
        maxAge: 3600000,
        httpOnly: true,
        secure:true,
        sameSite: "strict",
      });

      res
        .status(201)
        .json({ status: true, accessToken: user_accessToken, user: user });
    }
    } catch (error) {
      console.log('error in loginUserController',error);
      next(error)
      
    }
  };
  return loginUserController;
};


