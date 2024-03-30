import express from "express";
import { recruiterController } from "../../lib/controller";

export default (dependencies: any) => {
  const router = express();
  const { getJobApplicationsController,getApplicationDetailsController,changeApplicationStatusController } = recruiterController(dependencies);
  router.get("/get-all-applications/:id", getJobApplicationsController);
  router.get("/application-details/:id", getApplicationDetailsController);
  router.post("/change-application-status",changeApplicationStatusController)

  return router;
};
