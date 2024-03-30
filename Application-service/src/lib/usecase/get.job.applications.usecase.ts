
export const get_job_applications_usecase = (dependencies:any)=> {
    const {repository:{applicationRespository}} = dependencies

    const executeFunction = async(jobPostId:string)=> {
        // console.log('in usecaasw');
        // console.log(jobPostId);
        
        const response = await applicationRespository.jobApplications(jobPostId)

        if(response?.status){
            return {status:response?.status,applicationList:response?.applicationList}
        }else{
            return {status:response?.status,message:response?.message}

        }
    }
    return {executeFunction}
}