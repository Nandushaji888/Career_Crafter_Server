import mongoose, { Schema, ObjectId } from "mongoose";
import {
  IPost,

} from "../../../../utils/interfaces/interfaces";
import { WorkArrangementType, employmentType } from "../../../../utils/interfaces/enum";

const postSchema: Schema<IPost> = new Schema<IPost>({
  postName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  responsibilities: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
  },
  qualification: {
    type: String,
  },
  salary: {
    type: String,
  },
  questions: [
    {
      question: String,
      answer: String,
    },
  ],

  recruiterEmail: {
    type: String,
    required: true,
  },
  recruitingPlace: {
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
  recruiterId: {
    type: String,
  },

  closingDate: {
    type: Date,
  },
  workArrangementType: {
    type: String,
    enum: Object.values(WorkArrangementType),
  },
  employmentType: {
    type: String,
    enum: Object.values(employmentType),
  },
  isPremium: {
    type: Boolean,
    required: true,
    default: false,
  },
  isRejected: {
    type: Boolean,
    default: false,
  },

  isListed: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  rejectedReason: {
    type: String,
  },
});

postSchema.index({'recruitingPlace.coordinates': '2dsphere' });

// db.posts.createIndex({'recruitingPlace.coordinates': '2dsphere'})
const Post = mongoose.model<IPost>("Post", postSchema);

export { Post };
