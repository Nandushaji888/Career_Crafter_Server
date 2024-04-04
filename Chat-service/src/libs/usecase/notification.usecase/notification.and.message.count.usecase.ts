

export const notification_and_message_count_usecase = (dependencies:any)=> {
    const {repository:{notificationRepository}} = dependencies;
    const executeFunction = async(userId:string)=> {
        try {        
        const response = await notificationRepository?.notificationAndMessageCount(userId)
        if(response?.status){
            return {status:true,notificationCount:response?.notificationCount,messageCount:response?.messageCount}
        }else{
            return {status:false}
        }
        } catch (error) {
            console.log('error in notification_and_message_count_usecase',error);
                return {status:false}
        }
    }
    return {executeFunction}

  
}