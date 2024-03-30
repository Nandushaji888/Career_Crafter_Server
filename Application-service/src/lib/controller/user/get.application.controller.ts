

import { Request,Response } from "express";

export default (dependencies:any)=> {
    const {useCase:{get_application_usecase}} = dependencies

    const getApplicationController = async(req:Request,res:Response)=> {
        try {

            console.log(req.body);
            
            const jobPostId = req.body?.id
            const userId = req.body?.userData?._id
            const response = await get_application_usecase(dependencies).executeFunction(userId,jobPostId)
            
            if(response?.status){
                return res.status(200).json({status:true,application:response?.application})
            }else{
                return res.status(500).json({status:false,message:response?.message})
                
            }
        } catch (error) {
            console.log('error in get application controller',error);
            
            return res.status(500).json({status:false,message:'Internal server error'})
            
        }
    }
    return getApplicationController
}