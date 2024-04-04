import { Request, Response } from "express";
import { applicationStatusChangeProducer } from "../../../events/change.application.status.producer";

export default (dependencies: any) => {
  const {
    useCase: { change_application_status },
  } = dependencies;

  const getApplicationDetailsController = async (
    req: Request,
    res: Response
  ) => {
    const { id, status } = req.body;


    

    const response = await change_application_status(
      dependencies
    ).executeFunction(id, status);

    if (response?.status) {
      const {applicationData} = response
      let content;
      if(applicationData?.status==='rejected'){
        content = 'Your Application has been rejected'
      }else if(applicationData?.status === 'accepted'){ 
        content = 'Your Application has been shortlisted'
      }
      const data:any = {
        applicationData,
        content
      }

      
      if(applicationData?.status==='rejected' || applicationData?.status === 'accepted'){

        applicationStatusChangeProducer(data,'notificationTopic','newNotification')
      }
      res
        .status(200)
        .json({
          status: response?.status,
          application: response?.application,
          message: response?.message,
        });
    } else {
      res
        .status(400)
        .json({ status: response?.status, message: response?.message });
    }
  };
  return getApplicationDetailsController;
};
