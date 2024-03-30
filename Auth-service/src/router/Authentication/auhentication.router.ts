import express from "express";

import { profileController } from "../../libs/controller";
export default (dependencies: any) => {
  const router = express();
  const {
    createUserController,
    userLoginController,
    verifyOTPController,
    forgotPasswordController,
    userLogoutController,
    resendOTPController,
    fpOTPVerifyController,
    userCreateNewPassController,
    userGoogleSigninController
  } = profileController(dependencies);
  router.post("/signup", createUserController);
  router.post("/login", userLoginController);
  router.post("/verify-otp", verifyOTPController);
  router.post("/logout", userLogoutController);
  router.get("/resend-otp", resendOTPController);
  router.post("/forgot-password", forgotPasswordController);
  router.post("/otp-verify", fpOTPVerifyController);
  router.post("/new-password", userCreateNewPassController);
  router.post("/google-auth",userGoogleSigninController);

  return router;
};
