import mongoose, { Schema, Document } from 'mongoose';
import {IAdmin,AuthType} from '../../../../utils/interfaces/interface'


const adminSchema: Schema<IAdmin> = new Schema<IAdmin>({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: false
    },
    type: {
        type: String,
        enum: Object.values(AuthType),
        default: AuthType.User
    },

});

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);
export { Admin, AuthType };
