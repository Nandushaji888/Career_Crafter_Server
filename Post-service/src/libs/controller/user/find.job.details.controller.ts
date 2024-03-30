import {Request,Response} from 'express'

export default(dependencies:any)=> {
    const {
        useCase:{findJobDetailsuseCase}
    }=dependencies

    const findJobDetailsController = async(req:Request,res:Response)=> {
try {
    const id = req.params.id
    const data = await findJobDetailsuseCase(dependencies).executeFunction(id)

    if(data?.status){
        // console.log(data.jobData);
        
       return res.status(200).json({status:data?.status,jobData:data?.jobData})
    }else{
        
       return res.status(404).json({status:data?.status,message:data?.message})

    }
} catch (error) {
    console.log(error);
    
    return res.status(404).json({status:false})
    
}
        
    }
    return findJobDetailsController
}