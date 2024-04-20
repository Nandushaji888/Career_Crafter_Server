import { NextFunction, Request, Response } from "express";
import { userProducer } from "../../../../events/userProducer";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { verifyOTP_useCase },
  } = dependencies;

  const verifyOTPcontroller = async (req: Request, res: Response,next:NextFunction) => {
   try {
    const { otp } = req.body;

    if (otp === req.session.Otp) {
      const data = req.session.userData;
      const response = await verifyOTP_useCase(dependencies).executeFunction(
        data
      );

      if (response.status) {


        const { accessToken, refreshToken } = response;

        const user = response.user.response;


        req.session.refreshToken = refreshToken;
        res.cookie("user_accessToken", accessToken, {
          maxAge: 3600000,
          httpOnly: true,
          secure: true,
        });
        res.cookie("user_refreshToken", refreshToken, {
          maxAge: 7200000,
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        const userData = {
          _id: user?._id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone || "",
          isGoogle: user?.isGoogle,
          type: user?.type,
          status: user?.status,
          createdOn: user?.createdOn,
          location: user?.location,
        };
        await userProducer(userData, "authTopic", "createUser");

        req.session.Otp = undefined;
        req.session.userData = undefined;

        res
          .status(201)
          .json({ status: true, accessToken: accessToken, user: user });
      } else {
        res.status(401).json({ status: false, message: response.message });
      }
    } else {
      res
        .status(401)
        .json({ status: false, message: "Incorrect OTP Provided" });
    }
   } catch (error) {
    console.log('error in verifyOTPController user',error);
    
    next(error)
   }
  };

  return verifyOTPcontroller;
};
