import { Response,Request } from "express"

export default (dependencies:any)=> {
    const {useCase:{get_all_notifications_by_userId_usecase}} = dependencies
    const get_all_notifications_by_userId_controller = async(req:Request,res:Response)=> {
        try {

            const userId = req.params.id
            const response = await get_all_notifications_by_userId_usecase(dependencies).executeFunction(userId)
            if(response?.status){
                return res.status(200).json({status:true,notifications:response?.notifications})
            }else{
                return res.status(404).json({status:false,message:response?.message})
            }
        } catch (error) {
            console.log('error in get_all_notifications_by_userId_controller',error);4
            return res.status(500).json({status:false,message:'Internal server error'})
            
        }
    }
    return get_all_notifications_by_userId_controller
}