import express from "express";

import {profileController} from '../../libs/controller'
export default (dependencies: any) => {
  const router = express();
  const {adminLoginController,adminLogoutController,getRecruiterListController,getRecruiterDetailsController,changeRecruiterStatusController} = profileController(dependencies);
  router.post('/login',adminLoginController)
  router.post('/logout',adminLogoutController)
  router.get('/recruiters-list',getRecruiterListController)
  router.get('/recruiter/:id',getRecruiterDetailsController)
  router.post('/change-recruiter-status',changeRecruiterStatusController)



  return router
};

