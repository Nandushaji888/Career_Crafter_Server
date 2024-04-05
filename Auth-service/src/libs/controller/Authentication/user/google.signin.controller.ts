import {Request,Response} from 'express'

export default (dependencies:any)=> {


    const {useCase:{userGoogleAuthuseCase}} = dependencies;
const userGoogleAuthController = async(req:Request,res:Response)=> {
    // console.log('req.body.userData');
    const userData = req.body.userData
    const data ={
        name:userData?.name,
        email:userData?.email,
        isGoogle:true,
        type:'user'
    }

// const response = await userGoogleAuthuseCase(dependencies)?.executeFunction(data)

const useCaseInstance = await userGoogleAuthuseCase(dependencies);
if (useCaseInstance) {
    const response = await useCaseInstance.executeFunction(data);
    console.log('response in controller');
    console.log(response);
    const { user, user_accessToken, user_refreshToken } = response;

    if(response.status){
        res.cookie("user_accessToken", user_accessToken, {
            maxAge: 3600000,
            httpOnly: true,
            secure:true,
            sameSite:"strict"
          });
          res.cookie("user_refreshToken", user_refreshToken, {
            maxAge: 7200000,
            httpOnly: true,
            secure:true,
            sameSite: "strict",
          });
        res.status(200).json( {status:response.status,user_accessToekn:response?.user_accessToekn,user:response?.user,googleSignup:response?.googleSignup})
    }else{
         res.status(500).json({status:false, message:response?.message})
    }

}

}
return userGoogleAuthController
}