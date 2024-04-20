import { Response, Request, NextFunction } from "express";
import { sendOTP } from "../../../helper";
import { Dependencies } from "../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const resentOtpController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
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
    } catch (error) {
      console.log("error in resentOTPCOntroller", error);

      next(error);
    }
  };
  return resentOtpController;
};
