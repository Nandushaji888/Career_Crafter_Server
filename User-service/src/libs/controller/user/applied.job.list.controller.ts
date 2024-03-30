

import {Request,Response} from 'express'

export default (dependencies:any)=> {
    const {useCase:{applied_job_list_usecase}} = dependencies

    const appliedJobListController = async(req:Request,res:Response)=> {
        try {

            console.log('in  applied job ist controller');
            
            
            const userId = req.params.id;
            console.log(userId);
            const response = await applied_job_list_usecase(dependencies)?.executeFunction(userId)
            if(response.status){
               if( response?.appliedJobList){

                    return res.status(200).json({status:response?.status,appliedJobList:response?.appliedJobList})
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
    return appliedJobListController
}