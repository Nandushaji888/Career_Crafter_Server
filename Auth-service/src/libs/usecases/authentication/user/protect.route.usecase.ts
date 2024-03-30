

export const protect_route_useCase = (dependencies:any)=> {

    const {repository:{authenticationRepository}} = dependencies

    const executeFunction=async(userId:string)=> {

        const response = await authenticationRepository?.findUserById(userId)
        
        if(response?.status){
            return {status:response?.status,user:response?.user}
        }else{
            return {status:response?.status,message:response?.message}

        }
    }
    return {executeFunction}
}