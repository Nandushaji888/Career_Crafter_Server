import mongoose, { Document } from "mongoose";
import { IChatParticipant } from "./chat.participants.schema";

interface INotification {
  userId: IChatParticipant["_id"];
  readStatus:boolean;
  message: string;
  jobPostId:string;
  applicationId:string;
  applicationStatus:string;
  postStatus:string;
}

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatParticipants",
    required: true,
  },
  message: {
    type: String, 
    required: true,
  },
  jobPostId: {
    type: String,
  },
  applicationId: {
    type: String,
  },
  readStatus: {
    type: Boolean,
    default: false,
  },
  applicationStatus:{
    type:String
  },
  postStatus:{
    type:String
  },
  rejectedReason:{
    type:String
  }
},{timestamps:true});

const Notification = mongoose.model<INotification>("Notification", notificationSchema);

export {Notification}