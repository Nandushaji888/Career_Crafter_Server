import express from "express";

import {profileController} from '../../libs/controller'
export default (dependencies: any) => {
  const router = express();
  const { recruiterLoginController,verifyRecruiterOTPController,createRecruiterController,recruiterLogoutController } = profileController(dependencies);
  router.post('/signup',createRecruiterController)
  router.post('/login',recruiterLoginController)
  router.post('/verify-otp',verifyRecruiterOTPController)
  router.post('/logout',recruiterLogoutController)



  return router
};
