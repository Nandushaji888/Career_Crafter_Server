import express from "express";

import { profileController } from "../../libs/controller";
import { Dependencies } from "../../interfaces/dependency.interface";
import { verifyToken } from "../../utils/jwt/verifyToken";
import { AuthType } from "../../interfaces/interface";
export default (dependencies: Dependencies) => {
  const router = express();
  const {
    adminLoginController,
    adminLogoutController,
    getRecruiterListController,
    getRecruiterDetailsController,
    changeRecruiterStatusController,
  } = profileController(dependencies);
  router.post("/login", adminLoginController);
  router.post("/logout", adminLogoutController);
  router.get("/recruiters-list",verifyToken(AuthType.Admin), getRecruiterListController);
  router.get("/recruiter/:id",verifyToken(AuthType.Admin), getRecruiterDetailsController);
  router.post("/change-recruiter-status",verifyToken(AuthType.Admin), changeRecruiterStatusController);

  return router;
};
