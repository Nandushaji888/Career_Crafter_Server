import mongoose, { Schema, ObjectId } from "mongoose";
import { IUser,AuthType } from "../../../../utils/interfaces/interfaces";

const userSchema: Schema<IUser> = new Schema<IUser>({
  _id: String,
  name: { type: String },
  email: {
    type: String,
    // required: true, unique: true
  },
  phone: {
    type: String,
    //  required: true
  },
  type: {
    type: String,
    enum: Object.values(AuthType),
    default: AuthType.User,
  },
  status: { type: Boolean },
  isGoogle: {
    type: Boolean,
  },
  aboutYou: {
    type: String,
  },

  createdOn: { type: Date },
  editedOn: { type: Date, default: Date.now() },
  resume: { type: String },
  qualification: { type: String },
  skills: { type: String },
  location: {
    locationName: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    },
  },
  experience: { type: String },
  secondarySkills: { type: String },
});

const User = mongoose.model<IUser>("User", userSchema);
export { User, AuthType };
