import { Response, Request, NextFunction } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const forgotPassOTPVerify = (req: Request, res: Response,next:NextFunction) => {
    try {
      const { otp } = req.body;

      if (otp === req.session.Otp) {
        res.status(200).json({status:true})
      }else{
        res.status(400).json({ status: false, message: "Invalid OTP" });
    }
    } catch (error) {
        console.log(error);
        next(error)

    }
  };
  return forgotPassOTPVerify;
};
