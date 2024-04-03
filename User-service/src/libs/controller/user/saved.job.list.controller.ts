

import {Request,Response} from 'express'

export default (dependencies:any)=> {
    const {useCase:{saved_job_list_usecase}} = dependencies

    const savedJobListController = async(req:Request,res:Response)=> {
        try {           
            console.log('in controller');
            
            const userId = req.params.id;
            // console.log(userId);
            // console.log(dependencies);
            
            
            const response = await saved_job_list_usecase(dependencies)?.executeFunction(userId)
            console.log(response);
            
            if(response.status){
               if( response?.savedJobList){

                    return res.status(200).json({status:response?.status,savedJobList:response?.savedJobList})
                }else{
                    
                    return res.status(404).json({status:response?.status,message:response?.message})
                }
            }else{
                return res.status(500).json({status:false,message:response?.message})
            }
        } catch (error) {
            return res.status(500).json({status:false,message:"Internal server error"})
            
        }
    }
    return savedJobListController
}