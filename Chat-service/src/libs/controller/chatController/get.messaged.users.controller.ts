import {Request,Response} from 'express'

export default (dependencies:any)=> {
const{useCase:{get_messaged_users_usecase}} = dependencies

const get_messaged_users_controller= async(req:Request,res:Response)=> {
    try {
        
        const userId = req.params.id
        const response = await get_messaged_users_usecase(dependencies).executeFunction(userId)

        if(response?.status) {
  
            
            
           return res.status(200).json({status:true,messagedUsers:response?.messagedUser})
        }else{
           return res.status(response?.code).json({message:response?.message})
        }
    } catch (error) {
        console.log('error in get messaged users controller',error);
        
        return res.status(500).json({status:false,message:'Internal server error'})
    }
}
return get_messaged_users_controller
}