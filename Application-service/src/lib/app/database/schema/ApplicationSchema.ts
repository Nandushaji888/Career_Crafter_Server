import mongoose, { Schema, mongo } from "mongoose";
import { ApplicationType, IApplication } from "../../../../utils/interface/interface";



const applicationSchema :Schema<IApplication> = new Schema<IApplication>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    createdOn:{
        type:Date,
        default:Date.now()
    },
    jobPostId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:ApplicationType,
        default:ApplicationType.Pending
    },
    questionAnswer: [
        {
          question: String,
          answer: String,
          givenAnswer:String,
        },
      ],
})

const Application =  mongoose.model<IApplication>("Application",applicationSchema)

export {Application}