import { sendOTP } from "../../../../helper";

export const userForgotPassword_useCase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async(email : string)=> {
      
      try {
        const user = await authenticationRepository?.findUser(email)
        console.log('user',user);
        
        if(user){
            const response = await sendOTP(email,user?.name);
            if(response.status){
                console.log(response);
                
                return {status:true,otp:response.otp,user:user}
            }else{
                return {status:false, message:"Error in sending verification OTP"}
            }
        }else{
            return {status:false, message:`This email isn't registered with us `}
        }
    } catch (error) {
        console.log(error);
        
    }
  }
  return {executeFunction}
};
