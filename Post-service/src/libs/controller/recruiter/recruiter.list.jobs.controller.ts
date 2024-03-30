import {Request,Response} from 'express'


export default (dependencies:any)=> {

    const {useCase:{recruiter_list_jobs}} = dependencies

    const recruiterListJobsController = async(req:Request,res:Response)=>{
        const id = req.params.id
        const response = await recruiter_list_jobs(dependencies).executeFunction(id)



        if(response?.status){
            res.status(200).json({status:response?.status,jobList:response?.jobList})
        }else{
            res.status(404).json({status:response?.status,message:response?.message})
        }
        
    }
   return recruiterListJobsController
}