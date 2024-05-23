import express from "express";
import { userPostController } from "../../libs/controller";
import { Dependencies } from "../../utils/interfaces/dependency.interface";
export default (dependencies: Dependencies) => {
  const router = express();
  const { findJobDetailsController, getAllPosts } =
    userPostController(dependencies);

  router.get("/job-details/:id", findJobDetailsController);
  router.get("/list-jobs", getAllPosts);

  return router;
};
