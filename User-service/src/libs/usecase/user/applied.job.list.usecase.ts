

export const applied_job_list_usecase=(dependencies:any)=> {
    const {repository:{userRepository}} = dependencies

    const executeFunction = async(userId:string)=> {
        const response = await userRepository?.appliedJobList(userId)

        if(response?.status){
            return {status:response?.status,appliedJobList:response?.appliedJobList,message:response?.message}
        }else{
            return {status:response?.status,message:response?.message}
        }
    }
    return {executeFunction}
}