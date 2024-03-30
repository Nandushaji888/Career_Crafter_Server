
export const pending_post_count_usecase = (dependencies:any)=> {
    const {repository:{postRepository}} = dependencies

    const executeFunction = async()=> {
        const response = await postRepository?.pendingPost()

        if(response?.status){
            return {status:response?.status,posts:response?.posts}
        }else{
            return {status:response?.status,message:response?.message}

        }
    }
    return {executeFunction}
}