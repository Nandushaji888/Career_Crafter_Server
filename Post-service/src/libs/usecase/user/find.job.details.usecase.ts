
export const findJobDetailsuseCase=(dependencies:any)=> {
    const {
        repository:{postRepository}
    }=dependencies

    const executeFunction = async(id:string)=> {
        const data = await postRepository?.findJobPost(id)
        if(data.status){
            return {status:data?.status,jobData:data?.jobDetails}
        }else{
            
            return {status:data?.status,message:data?.message}

        }
    }
    return {executeFunction}
}