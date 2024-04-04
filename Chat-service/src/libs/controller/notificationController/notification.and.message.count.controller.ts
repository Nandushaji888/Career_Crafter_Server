

import { Request,Response } from "express";

export default (dependencies:any)=> {
    const {useCase:{notification_and_message_count_usecase}} = dependencies

    const notification_and_message_count_controller = async(req:Request,res:Response)=> {
        try {
            const userId=req.params.id 
            
            const response = await notification_and_message_count_usecase(dependencies)?.executeFunction(userId)
            if(response?.status){
                return res.status(200).json({status:true,notificationCount:response?.notificationCount,messageCount:response?.messageCount})
            }else{
                return res.status(404).json({status:false,message:'No count availabe'})
            }
            
        } catch (error) {
            console.log('error in notification_and_message_count_controller',error);
            return res.status(500).json({status:false,message:'Intenal server error'})
        }
    }
    return notification_and_message_count_controller
}