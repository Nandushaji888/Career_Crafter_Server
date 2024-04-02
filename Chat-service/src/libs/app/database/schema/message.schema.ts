import mongoose, { Document } from "mongoose";
import { IChatParticipant } from "./chat.participants.schema";

interface IMessage extends Document {
    senderId: IChatParticipant["_id"];
    receiverId: IChatParticipant["_id"];
    message: string;
    readStatus:boolean;
}

const messageSchema = new mongoose.Schema<IMessage>({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatParticipants",    
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatParticipants",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    readStatus: { type: Boolean, default: false },

}, { timestamps: true });

const Message = mongoose.model<IMessage>("Message", messageSchema);

export {Message};
