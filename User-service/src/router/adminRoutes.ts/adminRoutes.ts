import express from "express";



import { adminController,userController } from "../../libs/controller";

export default (dependencies: any) => {
  const router = express();
  const { getAllusersController,changeUserStatusController } = adminController(dependencies);
  const{getuserDataController}=userController(dependencies)
  router.get('/get-all-users',getAllusersController)
  router.get('/user/:id',getuserDataController)
  router.post('/user/change-user-status',changeUserStatusController)



  return router
};
