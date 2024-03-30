

import {Request,Response} from 'express'

export default(dependencies:any)=> {
    
    const {useCase:{get_application_details_usecase}} = dependencies

    const getApplicationDetailsController = async(req:Request,res:Response)=> {
        const applicationId = req.params.id


        const response = await get_application_details_usecase(dependencies).executeFunction(applicationId)

        if(response?.status){
            res.status(200).json({status:response?.status,application:response?.application})
        }else{
            res.status(404).json({status:response?.status,message:response?.message})

        }
    }
    return getApplicationDetailsController
}