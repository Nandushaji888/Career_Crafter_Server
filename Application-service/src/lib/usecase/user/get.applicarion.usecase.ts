

export const get_application_usecase = (dependencies:any)=> {
    console.log(dependencies);
    
    const {repository:{applicationRespository}} = dependencies

    const executeFunction= async(userId:string,jobPostId:string)=> {
        const res = await applicationRespository?.getApplication(userId,jobPostId)

        if(res.status){
            return {status:res?.status,application:res?.application[0]}
        }else{
            return {status:res?.status,message:res?.message}

        }
    }
    return {executeFunction}
}