import { Response,Request} from 'express'

export default (dependencies:any)=> {
    const {useCase:{changeRecruiterStatus_useCase}}= dependencies

    const changeRecruiterStatusController =async(req:Request,res:Response)=> {
        try {

            const {id,status} = req.body.formData
            const response = await changeRecruiterStatus_useCase(dependencies).executeFunction(id,status)
            if(response?.status){
                res.clearCookie('recruiter_accessToken')
                res.clearCookie('recruiter_refreshToken')
                return res.status(200).json({status:response?.status,recruiters:response?.recruiters,message:response?.message})
            }else{
                return res.status(500).json({status:response?.status,message:response?.message})
    
            }
        } catch (error) {
            console.log('error in change user status controller',error);
            return res.status(500).json({status:false,message:'Internal Server Error'})
            
        }
      
    }
    return changeRecruiterStatusController
}