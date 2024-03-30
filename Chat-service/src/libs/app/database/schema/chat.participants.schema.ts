import mongoose, { Document } from "mongoose";

interface IChatParticipant extends Document {
  name: string;
  email: string;
  type: "user" | "recruiter";
}

const chatParticipantsSchema = new mongoose.Schema<IChatParticipant>(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      // unique: true,
    },
    type: {
      type: String,
      // required: true,
      enum: ["user", "recruiter"],
    },
  },
  { timestamps: true }
);

const ChatParticipants = mongoose.model<IChatParticipant>(
  "ChatParticipants",
  chatParticipantsSchema
);

export { ChatParticipants,IChatParticipant };
