import { ApplicationType } from "../../../utils/interface/interface"
import {sendMail} from '../../../helper/nodemailer'


export const change_application_status = (dependencies:any)=> {
    const {repository:{applicationRespository}} = dependencies

    const executeFunction = async(id:string,status:ApplicationType)=> {
        const response = await applicationRespository.changeApplicationStatus(id,status)

        if (response?.status) {

          const {applicationData} = response
          // console.log('applicationData');
          // console.log(applicationData);
          if(applicationData?.status === 'accepted' || applicationData?.status === 'rejected'){
            const status = applicationData?.status === 'accepted' ? true:false
            const success = await sendMail(applicationData,status)
            if(!success){
              return { status: response?.status, applicationData: response?.applicationData,message: 'Application status changed successfully. Error in sending email to candidate' };

            }
          }
          

            return { status: response?.status, applicationData: response?.applicationData,message: 'Application status changed successfully. Email send to candidate..' };
          } else {
            return { status: response?.status, message: response?.message };
          }
    }
    return {executeFunction}
}