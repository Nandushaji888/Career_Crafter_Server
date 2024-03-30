import express from "express";



import { userController } from "../../libs/controller";
import { verifyUser } from "../../utils/jwt/verifyToken";
import { uploadResume } from "../../utils/multer/s3Multer";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default (dependencies: any) => {
  const router = express();
  const { userUpdateController,getuserDataController,saveJobPostController,appliedJobListController,savedJobListController } = userController(dependencies);
  router.post('/update-user',verifyUser,uploadResume,userUpdateController)
  router.get('/applied-jobs/:id',verifyUser,appliedJobListController)
  router.get('/saved-jobs/:id',verifyUser,savedJobListController)
  // router.post('/update-user',verifyUser,upload.single("file"), userUpdateController)verifyUser,uploadResume, 
  router.post('/save-post',verifyUser,saveJobPostController)
  router.get('/:id',verifyUser,getuserDataController)
  




  return router
};
