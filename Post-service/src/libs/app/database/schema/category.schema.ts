import mongoose, { Schema, Document } from 'mongoose';
import {ICategory,} from '../../../../utils/interfaces/interfaces'


const categorySchema: Schema<ICategory> = new Schema<ICategory>({
    categoryName: {
        type:String,
        unique:true,
        required:true
    },
    categoryDescription: {
        type: String,
        required: true,
    },

    isListed: {
        type: Boolean,
        required: true,
        default:true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

});

const Category = mongoose.model<ICategory>("Category", categorySchema);
export { Category };
