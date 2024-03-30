import mongoose,{Schema} from "mongoose";
import { IPost, employmentType } from "../../../../utils/interface/interface";

const postSchema :Schema<IPost> = new Schema<IPost>({
    _id:String,
    postName:String,
    company:String,
    createdAt:Date,
    employmentType:{
      type: String,
      enum: Object.values(employmentType),
    },
    isPremium:Boolean,
    isListed:Boolean,
    closingDate:Date,
    skills:String,
    qualification:String,
    recruitingPlace:{
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
    // category: [{ type: Schema.Types.ObjectId, ref: "Category" }],

})

const Post = mongoose.model<IPost>("Post",postSchema)
export {Post,employmentType}