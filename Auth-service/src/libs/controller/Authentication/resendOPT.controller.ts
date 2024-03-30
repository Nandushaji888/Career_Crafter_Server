import { Response, Request } from "express";
import { sendOTP } from "../../../helper";

export default (dependencies: any) => {
  

  const resentOtpController = async (req: Request, res: Response) => {
    const data = req?.session?.userData;
    console.log(data);
    console.log(data?.email);
    if (data) {
      const email = data?.email;

      const response = await sendOTP(email, data?.name);
      if (response?.status) {
        console.log(response);
        
        req.session.Otp = response?.otp;
        res.json({
          status: response?.status,
        });
      } else {
        res.json({ status: false, message: "Error in sending Email" });
      }
    }
  };
  return resentOtpController;
};
