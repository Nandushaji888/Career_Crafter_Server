
export const conversation_message_count_usecase = (dependencies:any)=> {
    const {repository:{chatRepository}} = dependencies;

    const executeFunction = async(receiverId:string,senderId:string)=> {
        try {
            const response = await chatRepository?.conversationMessageCount(receiverId,senderId)

            if(response?.status){
                return {status:true,messageCount:response?.messageCount}
            }else{
                return {status:false}
            }
            
        } catch (error) {
            console.log('error in conversation_message_count_usecase',error);
            
            return {status:false,message:'Internal server error'}
        }
    }
    return {executeFunction}
}