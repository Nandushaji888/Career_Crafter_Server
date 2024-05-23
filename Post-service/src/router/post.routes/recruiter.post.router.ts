import express from "express";

import {
  recruiterPostController,
  userPostController,
} from "../../libs/controller";
import { Dependencies } from "../../utils/interfaces/dependency.interface";
import { verifyToken } from "../../utils/jwt/verifyToken";
import { AuthType } from "../../utils/interfaces/enum";
export default (dependencies: Dependencies) => {
  const router = express();
  const { createJobPostController, recruiterListJobsController } =
    recruiterPostController(dependencies);
  const { findJobDetailsController } = userPostController(dependencies);

  router.post("/create-job-post",verifyToken(AuthType.Recruiter), createJobPostController);
  router.get("/list-jobs/:id",verifyToken(AuthType.Recruiter), recruiterListJobsController);
  router.get("/job-details/:id",verifyToken(AuthType.Recruiter), findJobDetailsController);

  return router;
};
