import { Request, Response } from "express";
import { postStatusChangeProducer } from "../../../events/post.status.change.producer";

export default (dependencies: any) => {
  const {
    useCase: { poststatus_change_usecase },
  } = dependencies;

  const postStatusChangeController = async (req: Request, res: Response) => {
    try {
   
      
      const { id, status,rejectedReason } = req.body?.formData;


      const response = await poststatus_change_usecase(
        dependencies
      ).executeFunction(id, status,rejectedReason);

      
      if (response.status) {
        const {postData}= response
        let content;
        let postStatus;
        if(postData?.isListed){
          content='Your post got accepted';
          postStatus='accepted'
        }else if(postData?.isRejected){
          content='Your post got rejected'
          postStatus='rejected'
        }
        const applicationData={
          userId:postData?.recruiterId,
          jobPostId:postData?._id,
          postStatus:postStatus
        }
        const data :any={
          applicationData,content
        }
        postStatusChangeProducer(data,'notificationTopic','newNotification')

        res
          .status(200)
          .json({
            status: response?.status, 
            postData: response?.postData,
            message: response?.message,
          });
      } else {
        res.json({ status: response?.status, message: response?.message });
      }
    } catch (error) {
      console.log(error, "error in postChangestatusController");
    }
  };
  return postStatusChangeController;
};
