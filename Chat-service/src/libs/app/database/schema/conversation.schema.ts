import mongoose, { Document } from "mongoose";
import { IChatParticipant } from "./chat.participants.schema";

interface IConversation extends Document {
    participants: Array<IChatParticipant["_id"]>;
    messages: Array<mongoose.Types.ObjectId>;
}

const conversationSchema = new mongoose.Schema<IConversation>({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ChatParticipants"
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, { timestamps: true });

const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);

export  {Conversation};
