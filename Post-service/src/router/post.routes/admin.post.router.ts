
import express from "express";
import {adminPostController, userPostController} from '../../libs/controller'
export default (dependencies: any) => {
  const router = express();
  const {pendingPostCountController,postStatusChangeController,getAllPostsAdminController}= adminPostController(dependencies)
  const {findJobDetailsController}= userPostController(dependencies)
  
  router.get('/pending-job-posts',pendingPostCountController)
  router.get('/all-post-list',getAllPostsAdminController)

  router.get('/job-details/:id',findJobDetailsController)
  router.post('/job-post-status-change',postStatusChangeController)



  return router
};
