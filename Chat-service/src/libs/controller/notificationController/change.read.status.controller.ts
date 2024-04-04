import { Request,Response } from "express";

export default (dependencies:any)=> {
    const {useCase:{change_read_status_usecase}} = dependencies

    const change_read_status_controller = async(req:Request,res:Response)=> {
        try {
            const notificationids = req.body.notificationIds
            const response = await change_read_status_usecase(dependencies)?.executeFunction(notificationids)

            if(response?.status){
                return res.status(200).json({status:true})
            }else{
                
                return res.status(204).json({status:true,message:response?.message})
            }
            
        } catch (error) {
            console.log('error in change_read_status_usecase',error);4
            return res.status(500).json({status:false,message:'Internal server error'})
        }
    }
    return change_read_status_controller
}