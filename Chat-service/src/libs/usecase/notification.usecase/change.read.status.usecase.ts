import { INotification } from "../../../utils/interface"


export const change_read_status_usecase = (dependencies:any)=> {
    const {repository:{notificationRepository}} = dependencies

    const executeFunction = async(notificationIds:INotification)=> {
        try {
            const response = await notificationRepository?.readStatusChange(notificationIds)
            if(response?.status){
                return {status:true}
            }else{
                return {status:false,message:response?.message}
            }
            
        } catch (error) {
            console.log('error in change_read_status_usecase',error);
            return {status:false}
        }
    }
    return {executeFunction}
}