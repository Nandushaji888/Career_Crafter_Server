import { schema } from "../database";
const {Notification} = schema

export default {
    createNotification:async(data:any)=> {
        try {
            const notificationData = {
                userId:data?.userId,
                message:data?.content,
                jobPostId:data?.jobPostId,
                applicationId:data?._id,
                applicationStatus:data?.status,
                postStatus:data?.postStatus
            }
            const response = await Notification.create(notificationData);

            if (response) {
              return { status: true, message: "ChatParticipants created", response };
            } else {
              return { status: false, message: "error in creating ChatParticipants" };
            }            
        } catch (error) {
            console.log('error in create notification in notification repository',error);
            return {status:false,message:'Internal server error'}
        }
    },
    getNotificationsById:async(userId:string)=>{
        try {
            const notifications = await Notification.find({userId:userId})
            console.log(userId);
            console.log(notifications);
            
            
            if(notifications){
                return {status:true,notifications}
            }else{
                return {status:false,message:'No notification for you'}
            }
        } catch (error) {
            console.log('error in notifications by id in repository',error);
            return {status:false,message:'Internal server error'}

        }
    }
}