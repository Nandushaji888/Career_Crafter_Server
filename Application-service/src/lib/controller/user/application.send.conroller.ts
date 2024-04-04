import { Response, Request } from "express";
import { addAppliedJobProducer } from "../../../events/applyJobProducer";

export default (dependencies: any) => {
  const {
    useCase: { application_send_usecase },
  } = dependencies;

  const applicationSendController = async (req: Request, res: Response) => {
    
    const data  = req.body    
    
    const response = await application_send_usecase(
      dependencies
    ).executeFunction(data);

    if (response?.status) {
      const {userId,jobPostId}= response?.applicationData
      const kafkaData = {
        userId,jobPostId
      }
      addAppliedJobProducer(kafkaData,'addAppliedJodTopic','appliedJob')
      res
        .status(201)
        .json({
          status: response?.status,
          applicationData: response?.applicationData,
          message: response?.message,
        });
    }else{
        res.json({status:response?.status,message:response?.message})
    }
  };
  return applicationSendController
};
