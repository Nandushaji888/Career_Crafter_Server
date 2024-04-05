import { Request, Response } from "express";
import {userProducer} from '../../../../events/userProducer'

export default (dependencies: any) => {
  const {
    useCase: { verifyOTP_useCase },
  } = dependencies;

  const verifyOTPcontroller = async (req: Request, res: Response) => {
    const { otp } = req.body;

    if (otp === req.session.Otp) {
      const data = req.session.userData;
      const response = await verifyOTP_useCase(dependencies).executeFunction(
        data
      );

      if (response.status) {

        console.log('response');
        console.log(response);
        
        const {  accessToken, refreshToken } = response;
      
        const user = response.user.response

        

        // console.log('user');
        // console.log(user);
        
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
          _id:user?._id,
          name:user?.name,
          email:user?.email,
          phone:user?.phone || "",
          isGoogle:user?.isGoogle,
          type:user?.type,
          status:user?.status,
          createdOn:user?.createdOn,
          location:user?.location
        }
        // console.log('userData');
        // console.log(userData);

        
        
        await userProducer(userData, 'authTopic', 'createUser');



        req.session.Otp = undefined;
        req.session.userData = undefined;
        

        res
          .status(201)
          .json({ status: true, accessToken: accessToken, user: user });
      } else {
        res.status(401).json({ status: false, message: response.message });
      }
    } else {
      res.status(401).json({ status: false, message: "Incorrect OTP Provided" });
    }
  };

  return verifyOTPcontroller;
};
