import { Request, Response } from "express";
import { recruiterCreatedProducer } from "../../../../events/recruiterCreatedProducer";

export default (dependencies: any) => {
  const {
    useCase: { recruiter_verifyOTP_useCase },
  } = dependencies;

  const recruiterVerifyOTPcontroller = async (req: Request, res: Response) => {
    const { otp } = req.body;

    if (otp === req.session.rOtp) {
      const data = req.session.recruiterData;
      const response = await recruiter_verifyOTP_useCase(dependencies).executeFunction(
        data
      );
      console.log(response);

      if (response.status) {
        const { recruiter, accessToken, refreshToken } = response;
        // req.session.refreshToken = refreshToken;
        // const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        // res.cookie("accessToken", accessToken, {
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

        await recruiterCreatedProducer(recruiter?.response,'recruiterCreatedTopic','recruiterCreated')

        req.session.rOtp = undefined;
        req.session.recruiterData=undefined
        res.status(201).json({status:true,recruiter:recruiter})

      } else {
        res.status(400).json({ status: false, message: response.message });
      }
    } else {
      res.status(400).json({ status: false, message: "Incorrect otp" });
    }
  };
  return recruiterVerifyOTPcontroller;
};
