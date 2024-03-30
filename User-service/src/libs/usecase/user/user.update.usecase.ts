import { IUser } from "../../../utils/interface/interface"

export const updateUser_useCase = (dependencies:any)=> {
  const {
    repository:{userRepository}
  }=dependencies

  const executeFunction = async(data:IUser)=> {
    
    const response = await userRepository?.updateUser(data)

    // console.log(response);
    
    if(response.status){
        return {status:response?.status, user:response?.user,message:response?.message}
    }else{
        return {status:response?.status,message:response?.message}

    }
}
return executeFunction
}