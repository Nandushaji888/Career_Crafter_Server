import express from "express";

import { profileController } from "../../libs/controller";
import { Dependencies } from "../../interfaces/dependency.interface";
export default (dependencies: Dependencies) => {
  const router = express();
  const {
    recruiterLoginController,
    verifyRecruiterOTPController,
    createRecruiterController,
    recruiterLogoutController,
  } = profileController(dependencies);
  router.post("/signup", createRecruiterController);
  router.post("/login", recruiterLoginController);
  router.post("/verify-otp", verifyRecruiterOTPController);
  router.post("/logout", recruiterLogoutController);

  return router;
};
