import { ObjectId } from "mongoose"


export const get_messages_usecase = (dependencies:any)=> {

    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(senderId:ObjectId,userToChatId:ObjectId)=> {

        const response = await chatRepository?.getMessages(senderId,userToChatId)

        
        if(response?.status){
            return {status:response?.status,messages:response?.messages}
        }else{
            return {status:response?.status,messages:response?.messages}

        }
    }
    return {executeFunction}
}