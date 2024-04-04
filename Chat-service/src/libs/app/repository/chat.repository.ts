import { ObjectId } from "mongoose";
import { schema } from "../database";
import { IRecruiter, IUser } from "../../../utils/interface";

const { ChatParticipants, Conversation, Message } = schema;

export default {
  sendMessage: async (
    senderId: ObjectId,
    receiverId: ObjectId,
    message: string
  ) => {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    // await conversation.save()
    // await newMessage.save()
    const result = await Promise.all([conversation.save(), newMessage.save()]);

    if (result) {
      return { status: true, newMessage };
    } else {
      return { status: true, message: "Error in sending message" };
    }
  },
  creatChatParticipants: async (data: IUser | IRecruiter) => {
    console.log("reached repository");

    const receivedData = {
      _id: data?._id || "",
      name: data?.name || "",
      email: data?.email || "",
      type: data?.type === "user" ? "user" : "recruiter",
    };
    const response = await ChatParticipants.create(receivedData);

    if (response) {
      return { status: true, message: "ChatParticipants created", response };
    } else {
      return { status: false, message: "error in creating ChatParticipants" };
    }
  },

  getMessages: async (senderId: ObjectId, userToChatId: ObjectId) => {
    try {
      const conversation = await Conversation.findOne({
        participants: {
          $all: [senderId, userToChatId],
        },
      })
        .populate({
          path: "participants",
        })
        .populate("messages");
      if (!conversation) {
        return { status: false, message: "no messages" };
      }
      
      const messages = conversation.messages;
      // const participants = 
      
      return { status: true, messages };

    } catch (error) {
      console.log("Error in getMessage controller", error)
      return { status: false, message:'Internal server eroor' };

    }
  },
  //   messagedUsers:async(userId:ObjectId)=>{
  //     try {

  //       const conversation = await Conversation.find({
  //         participants:{
  //           $in:[userId]
  //         }
  //       }).populate("participants")

  //       console.log(conversation);

  //     } catch (error) {
  //       console.log("Error in getMessage controller", error);
  //       return {status:false,code:'500',message:'Internal server error'}
  //     }
  // }
  messagedUsers: async (userId: ObjectId) => {
    try {
      const conversations = await Conversation.find({
        participants: {
          $in: [userId],
        },
      }).populate("participants");

      const participantsList = conversations.map((conversation) => {
        const otherParticipant = conversation.participants.find(
          (participant) => participant._id.toString() !== userId.toString()
        );
        return otherParticipant;
      });
      return { status: true, messagedUsers: participantsList };
    } catch (error) {
      console.log("Error in getMessage controller", error);
      return { status: false, code: "500", message: "Internal server error" };
    }
  },
  changeMessageStatus: async (messageId: string) => {
    try {
      const response = await Message.findByIdAndUpdate(messageId, {
        readStatus: true,
      });
      const message = await Message.findById(messageId);

      if (response && message) {
        return { status: true, message };
      } else {
        return { status: false, message: "Error in changing message status" };
      }
    } catch (error) {
      console.log("error in changeMessage status repository", error);

      return { status: false, message: "Error in changing message status" };
    }
  },
createConversation:async(ids:any)=> {
try {
  const {receiverId,senderId} = ids;



  const data ={participants: [senderId,receiverId]}

   const conversationExists = await Conversation.findOne({participants:{$all:[senderId,receiverId]}}).populate("participants")
   if(conversationExists){
    return {status:true,conversationExists}
   }

  const response = await Conversation.create(data)
  if(response){
    return {status:true}
  }else{
    return {status:false}
  }

} catch (error) {
  console.log("error in createConversation repository", error);

  return { status: false };
}


},
findMessageByMessageId : async(messageId:string)=> {
  try {
    const message = await Message.findById(messageId)

    if(message){
      return {status:true,message}
    }else{
      return {status:false}
    }
  } catch (error) {
    console.log('error in findMessageByMessageId',error);
    return{status:false}
  }
}
};
