import {Request,Response} from 'express'


export default (dependencies:any)=> {
    const {useCase:{save_job_post_usecase}} = dependencies

    const saveJobPostController = async(req:Request,res:Response)=> {
        try {
            const {userId,jobPostId} = req.body
            const response = await save_job_post_usecase(dependencies)?.executeFunction(userId,jobPostId)
    
            if(response?.status){
               return res.status(200).json({status:response?.status,user:response?.user,message:'Job post saved successfully'})
            }else{
                if(response?.message === 'Job already saved'){
                   return res.status(409).json({status:response?.status,message:response?.message})
                }
               return res.status(500).json({status:response?.status,message:response?.message})
            }
        } catch (error) {
           return res.status(500).json({message:'Internal server error'})
            
        }
        

    }
    return saveJobPostController
}