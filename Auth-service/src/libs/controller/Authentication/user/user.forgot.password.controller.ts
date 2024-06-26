
import {Response,Request, NextFunction} from 'express'
import { Dependencies } from '../../../../interfaces/dependency.interface';

export default (dependencies :Dependencies)=> {
    const {useCase:{userForgotPassword_useCase}} = dependencies;

    const forgotPasswordController = async(req:Request,res:Response ,next:NextFunction)=> {
        
        try {
            const {email} = req.body
            console.log('email',email);
            const response = await userForgotPassword_useCase(dependencies)?.executeFunction(email)
            if(response.status){
   
                
                req.session.Otp= response.otp;
                // console.log('response');
                // console.log(response);
                
                req.session.userData = response.user.user
                res.status(200).json({status:true,message:'OTP successfully send to your mail'})
                
            }else{
                res.status(404).json({status:false,message:response?.message})
            }
        } catch (error) {
            // console.log('hereeeeeeee');
            console.log(error);
            next(error)

            
        }
    }
    return forgotPasswordController

}