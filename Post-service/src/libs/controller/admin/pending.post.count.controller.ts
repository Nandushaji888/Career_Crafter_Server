import {Request,Response} from 'express'

export default (dependencies:any)=> {
    const {useCase:{pending_post_count_usecase}} = dependencies

    const pendingPostCountController = async(req:Request,res:Response)=> {
        // console.log('hereeeee');
        
        const response = await pending_post_count_usecase(dependencies)?.executeFunction()

        if(response?.status){
            res.status(200).json({status:response?.status,posts:response?.posts})
        }else{
            res.status(404).json({status:response?.status,message:response?.message})

        }
    }
    return pendingPostCountController
}