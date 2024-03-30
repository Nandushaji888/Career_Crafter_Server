import { ApplicationType } from "../../../utils/interface/interface"


export const change_application_status = (dependencies:any)=> {
    const {repository:{applicationRespository}} = dependencies

    const executeFunction = async(id:string,status:ApplicationType)=> {
        const response = await applicationRespository.changeApplicationStatus(id,status)

        if (response?.status) {

            return { status: response?.status, applicationData: response?.applicationData,message: response?.message };
          } else {
            return { status: response?.status, message: response?.message };
          }
    }
    return {executeFunction}
}