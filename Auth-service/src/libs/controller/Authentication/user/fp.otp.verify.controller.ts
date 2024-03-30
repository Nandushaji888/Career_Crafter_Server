import { Response, Request } from "express";

export default (dependencies: any) => {
  const forgotPassOTPVerify = (req: Request, res: Response) => {
    try {
      const { otp } = req.body;

      if (otp === req.session.Otp) {
        res.status(200).json({status:true})
      }else{
        res.status(400).json({ status: false, message: "Invalid OTP" });
    }
    } catch (error) {
        console.log(error);
        
    }
  };
  return forgotPassOTPVerify;
};
