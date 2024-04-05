
export const clear_message_count_usecase = (dependencies:any)=> {
    const {repository:{chatRepository}} = dependencies;

    const executeFunction = async(receiverId:string,senderId:string)=> {
        try {
            const response = await chatRepository?.clearMessageCount(receiverId,senderId)

            if(response?.status) {
                return {status:true,messages:response?.messages}
            }else{
                return {status:false}
            }
        } catch (error) {
            console.log('error in clear_message_count_usecase',error);
            
            return {status:false,message:'Internal server error'}
        }
    }
    return {executeFunction}
}