export const get_all_notifications_by_userId_usecase = (dependencies:any)=> {
    const {repository:{notificationRepository}} = dependencies

    const executeFunction = async(userId:string)=> {
        try {
            const response = await notificationRepository?.getNotificationsById(userId)

            if(response?.status){
                return {status:true,notifications:response?.notifications}
            }else{
                return {status:false,message:response?.message}
            }
        } catch (error) {
            console.log('error in get_all_notifications_by_userId_usecase',error);
            return {status:false}
            
        }
    }
    return {executeFunction}
}