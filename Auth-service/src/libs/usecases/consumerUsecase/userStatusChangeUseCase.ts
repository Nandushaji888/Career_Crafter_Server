import { statusData } from "../../../utils/interfaces/interface"

export const userStatusChangeUsecase = (dependencies:any)=> {
    const {repository:{authenticationRepository}} = dependencies

    const executeFunction = async(data:statusData)=> {
        const response = await authenticationRepository?.changeStatus(data)

        if(response?.status){
            return {status:response?.status,user:response?.user,message:response?.message}
        }else{
            return {status:response?.status,message:response?.message}

        }
    }
    return {executeFunction}
}