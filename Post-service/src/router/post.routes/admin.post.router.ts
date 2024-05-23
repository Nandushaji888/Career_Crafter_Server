import express from "express";
import { adminPostController, userPostController } from "../../libs/controller";
import { Dependencies } from "../../utils/interfaces/dependency.interface";
import { verifyToken } from "../../utils/jwt/verifyToken";
import { AuthType } from "../../utils/interfaces/enum";
export default (dependencies: Dependencies) => {
  const router = express();
  const {
    pendingPostCountController,
    postStatusChangeController,
    getAllPostsAdminController,
  } = adminPostController(dependencies);
  const { findJobDetailsController } = userPostController(dependencies);

  router.get("/pending-job-posts",verifyToken(AuthType.Admin), pendingPostCountController);
  router.get("/all-post-list",verifyToken(AuthType.Admin), getAllPostsAdminController);

  router.get("/job-details/:id",verifyToken(AuthType.Admin), findJobDetailsController);
  router.post("/job-post-status-change",verifyToken(AuthType.Admin), postStatusChangeController);

  return router;
};
