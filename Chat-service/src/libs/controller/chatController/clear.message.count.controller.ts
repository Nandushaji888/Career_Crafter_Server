
import { Request,Response } from "express";

export default ( dependencies:any)=> {

    const {useCase:{clear_message_count_usecase}} = dependencies
    const clear_message_count_controller = async(req:Request,res:Response)=> {
        try {
            
            const senderId = req.params.id
            const receiverId= req.user?._id

            // console.log('senderId',senderId);
            // console.log('receiverId',receiverId);

            const response = await clear_message_count_usecase(dependencies)?.executeFunction(receiverId,senderId)
            if(response?.status){
                return res.status(200).json({status:true,messages:response?.messages})
            }else{
                return res.json({status:false})
            }
            
        } catch (error) {
            console.log("error in clear_message_count_controller", error);

            return res
              .status(500)
              .json({ status: false, message: "Internal server error" });
        }
    }
    return clear_message_count_controller
}