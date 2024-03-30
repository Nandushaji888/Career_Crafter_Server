

export const save_job_post_usecase = (dependencies:any)=> {
    const {repository: {userRepository}} = dependencies

    const executeFunction = async(userId:string,jobPostId:string)=> {
        const response = await userRepository.saveJobPost(jobPostId,userId)
        if(response?.status){
            return {status:response?.status,user:response?.user}
        }else{
            return {status:response?.status,message:response?.message}
        }
    }
    return {executeFunction}
}