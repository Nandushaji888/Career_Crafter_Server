
import express from "express";

import {recruiterPostController,userPostController} from '../../libs/controller'
export default (dependencies: any) => {
  const router = express();
  const { createJobPostController,recruiterListJobsController } = recruiterPostController(dependencies);
  const {findJobDetailsController} = userPostController(dependencies)
  
  router.post('/create-job-post',createJobPostController)
  router.get('/list-jobs/:id',recruiterListJobsController)
  router.get('/job-details/:id',findJobDetailsController)




  return router
};
