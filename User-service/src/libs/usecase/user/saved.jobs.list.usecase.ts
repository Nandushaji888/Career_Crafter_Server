

export const saved_job_list_usecase=(dependencies:any)=> {
    const {repository:{userRepository}} = dependencies

    const executeFunction = async(userId:string)=> {
        console.log('in usecase');
        console.log('in usecase');
        console.log('in usecase');
        console.log('in usecase');
        
        const response = await userRepository?.savedJobList(userId)

        if(response?.status){
            return {status:response?.status,savedJobList:response?.savedJobList,message:response?.message}
        }else{
            return {status:response?.status,message:response?.message}
        }
    }
    return {executeFunction}
}