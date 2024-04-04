

export const create_chat_conversation_usecase = (dependencies:any)=> {

    const {repository:{chatRepository}} = dependencies;

    const executeFunction = async(ids:any)=> {
        try {
            const response = await chatRepository?.createConversation(ids);
            if(response?.status){
                return {status:true}
            }else{
                return {status:false}
            }
        } catch (error) {
            console.log('error in change message status usecase',error);
            
            return {status:false,message:'Internal server error'}
        }
    }
    return {executeFunction}

}