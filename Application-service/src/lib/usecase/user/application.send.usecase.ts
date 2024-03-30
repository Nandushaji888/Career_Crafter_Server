import { IApplication } from "../../../utils/interface/interface";

export const application_send_usecase = (dependencies: any) => {
  const {
    repository: { applicationRespository },
  } = dependencies;

  const executeFunction = async (data: IApplication) => {
    const response = await applicationRespository.createApplication(data);

    if(response.status){
        return {status:response?.status,applicationData:response?.applicationData,message:response?.message}
    }else{
        return {status:response?.status,message:response?.message}

    }
  };

  return { executeFunction };
};
