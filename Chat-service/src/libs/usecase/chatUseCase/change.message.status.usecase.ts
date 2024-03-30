

export const change_message_status_usecase = (dependencies:any)=> {
    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(messageId:string)=> {
        try {
            const response = await chatRepository?.changeMessageStatus(messageId)
            if(response?.status){
                return {status:true,message:response?.message}
            }else{
                return {status:false,message:response?.message}
                
            }
        } catch (error) {
            console.log('error in change message status usecase',error);
            
            return {status:false,message:'Internal server error'}
        }
    }
    return {executeFunction}
}