

import {Response,Request} from 'express'

export default (dependencies:any)=> {
    const {useCase:{get_job_applications_usecase}} = dependencies

    const getJobApplicationsController = async(req:Request,res:Response)=> {
        const jobPostId = req.params.id 
        // console.log('jobPostIdddddddddddddddd');
        // console.log(jobPostId);

        const response = await get_job_applications_usecase(dependencies).executeFunction(jobPostId)

        if(response?.status){
            res.status(200).json({status:response?.status,applicationList:response?.applicationList})
        }else{
            res.status(404).json({status:response?.status,message:response?.message})

        }
        
    }
    return getJobApplicationsController
}