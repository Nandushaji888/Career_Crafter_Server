import mongoose, { Schema, Document } from 'mongoose';
import {IRecruiter,AuthType} from '../../../../utils/interfaces/interface'


const recruiterSchema: Schema<IRecruiter> = new Schema<IRecruiter>({
    name: String,
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Please provide a unique Phone number"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false
    },
    type: {
        type: String,
        enum: Object.values(AuthType),
        default: AuthType.Recruiter
    },
    worksAt:{
        type:String,
        required:true
    },
    status: {
        type: Boolean,
        default: true
    },
    isGoogle:{
        type:Boolean,
        default:false
      }
});

const Recruiter = mongoose.model<IRecruiter>("Recruiter", recruiterSchema);
export { Recruiter, AuthType };
