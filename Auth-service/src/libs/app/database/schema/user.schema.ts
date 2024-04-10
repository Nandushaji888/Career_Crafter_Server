import mongoose, { Schema, Document } from "mongoose";
import { IUser, AuthType } from "../../../../interfaces/interface";

const userSchema: Schema<IUser> = new Schema<IUser>({
  name: String,
  email: {
    type: String,
    required: [true, "Please provide a unique email"],
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    unique: false,
  },
  type: {
    type: String,
    enum: Object.values(AuthType),
    default: AuthType.User,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isGoogle:{
    type:Boolean,
    default:false
  },
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
  createdOn:{
    type:Date,
    default:Date.now()
  }
});

const User = mongoose.model<IUser>("User", userSchema);
export { User, AuthType };
