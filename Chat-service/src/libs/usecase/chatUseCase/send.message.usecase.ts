import { ObjectId } from "mongoose"


export const send_message_usecase = (dependencies:any)=> {

    const {repository:{chatRepository}} = dependencies

    const executeFunction = async(senderId:ObjectId,receiverId:ObjectId,message:string,)=> {
        const response = await chatRepository?.sendMessage(senderId,receiverId,message)

        if(response?.status){
            return {status:response?.status,newMessage:response?.newMessage}
        }else{
            return {status:response?.status,message:response?.message}

        }
    }
    return {executeFunction}
}