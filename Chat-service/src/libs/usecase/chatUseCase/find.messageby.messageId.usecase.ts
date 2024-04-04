

 export const find_message_usecase = (dependencies:any)=> {
    const {repository:{chatRepository}} = dependencies

    const executeFunction= async(messageId:string)=> {
        try {
            const response = await chatRepository?.findMessageByMessageId(messageId)

            if(response){
                return {status:true,message:response?.message}
            }else{
                return {status:false}
            }
        } catch (error) {
            console.log('error in find_message_usecase');
            return {status:false}
        }
    }
    return {executeFunction}
 }