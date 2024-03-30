

export const recruiter_list_jobs = (dependencies:any)=> {
    const {repository:{postRepository}} = dependencies

    const executeFunction = async(id:string)=> {
        const response = await postRepository?.recruiterListJobs(id)

        if(response?.status){
            return {status:response?.status,jobList:response?.jobList}
        }else{
            return {status:response?.status,message:response?.message}
        }
    }
    return {executeFunction}
}