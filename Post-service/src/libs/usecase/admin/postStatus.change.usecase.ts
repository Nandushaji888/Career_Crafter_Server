import { postProducer } from "../../../events/postProducer"


export const poststatus_change_usecase=(dependencies:any)=> {
    const {repository:{postRepository}}=dependencies

    const executeFunction = async(id:string,status:string,rejectedReason:string)=>{
   
        
        const response = await postRepository?.changeStatus(id,status,rejectedReason)


        if(response?.status){
            if(response?.postData){
                const {postData} = response
                await postProducer(postData,'postTopic','createPost')

            }
            return {status:response?.status,postData:response?.postData,message:response?.message}
        }else{
            return {status:response?.status,message:response?.message}

        }
    }
    return {executeFunction}
}