import { IApplication } from "../../../utils/interface/interface";
import schema from "../database";
import { IQuestion, ApplicationType } from "../../../utils/interface/interface";

const { Application } = schema;

export default {
  createApplication: async (data: IApplication) => {
    try {
      let appData = {
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        resume: data?.resume,
        jobPostId: data?.jobPostId,
        userId: data?.userId,
        questionAnswer: data?.questionAnswer,
        status: data?.status,
        postName:data?.postName,
        company:data?.company
      };

      if (appData?.questionAnswer) {
        const questionAnswers: IQuestion[] | undefined =
          appData?.questionAnswer;

        if (questionAnswers) {
          questionAnswers.forEach((el: any) => {
            if (el.answer !== el.givenAnswer) {
              console.log("different answers");
              appData = { ...appData, status: ApplicationType.Rejected };
            }
          });
        }
      }



      const applicationData = await Application.create(appData);
      if (applicationData) {
        return {
          status: true,
          message: "Application sent successfully",
          applicationData,
        };
      } else {
        return { status: false, message: "error in sending application" };
      }
    } catch (error) {
      console.log("error in creating application in repository", error);
    }
  },

  jobApplications: async (id: string) => {
    try {
      const response = await Application.find({ jobPostId: id });
      // console.log('response');
      // console.log(response);

      if (response) {
        return { status: true, applicationList: response };
      } else {
        return { status: false, message: "Error in getting Job Applications" };
      }
    } catch (error) {
      console.log("error in jobApplications in repository", error);
    }
  },
  getApplicationDetails: async (id: string) => {
    try {
      const response = await Application.findOne({ _id: id });

      if (response) {
        return { status: true, application: response };
      } else {
        return {
          status: false,
          message: "Error in getting  Application Details",
        };
      }
    } catch (error) {
      console.log("error in getApplicationDetails in repository", error);
      
      return {status:false,message:'Internal server error'}

    }
  },
  changeApplicationStatus: async (id: string, status: ApplicationType) => {
    try {
      const responsee = await Application.updateOne(
        { _id: id },
        { status: status }
      );
      const applicationData = await Application.findById(id)
      const response = await Application.findOne({ _id: id });

      if (responsee) {
        return { status: true, applicationData: applicationData,message:'Status successfully updated' };
      } else {
        return {
          status: false,
          message: "Error in updating status",
        };
      }
    } catch (error) {
      console.log("error in getApplicationDetails in repository", error);
      return {status:false,message:'Internal server error'}
    }
  },
  getApplication:async(userId:string,jobPostId:string)=> {
    try {
      const response = await Application.find({$and:[{userId:userId},{jobPostId:jobPostId}]})
      // console.log('response in repository');
      // console.log(response);
      if(response){
        return {status:true,application:response}
      }else{
        return {status:false,message:'Internal server error'}
      }
      
    } catch (error) {
      console.log('error in get application reposirory');
      
      return {status:false,message:'Internal server error'}
    }
  }
};
