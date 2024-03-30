
import express from "express";
import {userPostController} from '../../libs/controller'
export default (dependencies: any) => {
  const router = express();
  const {findJobDetailsController,getAllPosts}= userPostController(dependencies)

  router.get('/job-details/:id',findJobDetailsController)
  router.get('/list-jobs',getAllPosts)


  return router
};
