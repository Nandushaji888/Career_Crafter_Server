import {Request,Response} from 'express'
export default (dependencies:any)=> {
    const {useCase:{get_all_users_usecase}} = dependencies

    const getAllUsersController = async(req:Request,res:Response)=> {
        // console.log('heree');
        
        const response = await get_all_users_usecase(dependencies).executeFunction()

        if( response.status){
            res.status(200).json({status:response?.status,users:response?.users})
        }else{
            res.status(404).json({status:response?.status,message:response?.message})
        }
    }
    return getAllUsersController
}