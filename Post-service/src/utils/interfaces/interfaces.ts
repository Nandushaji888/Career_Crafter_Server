import { ObjectId } from 'mongoose';
import { AuthType, WorkArrangementType, employmentType } from './enum';




export interface IPost extends Document {
  postName: string;
  company: string;
  responsibilities: string;
  jobDescription: string;
  skills?: string;
  qualification?: string;
  salary?: string;
  questions?: { question: string; answer: string }[];
  recruiterEmail: string;
  recruitingPlace: {
    locationName?: string;
    type: 'Point';
    coordinates: number[];
  };
  recruiterId: string;
  closingDate?: Date;
  workArrangementType: WorkArrangementType;
  employmentType: employmentType;
  isPremium: boolean;
  isRejected: boolean;
  isListed: boolean;
  createdAt?: Date;
  rejectedReason?: string;
}


export interface recruitingPlace{
    locationName:string;
    type: 'Point';
    coordinates: [number, number]; 
}


export interface IUser {
    _id:string,
    name: string;
    email: string;
    phone: string;
    password: string;
    type: AuthType;
    status: boolean;
    isGoogle:boolean;
    dateOfBirth:string;
    appliedJobs:ObjectId[];
    savedJobs:ObjectId[];
    aboutYou:string;
    resume:string;
    qualification:string;
    skills:string;
    profilePic:string;
    createdOn:Date;
    editedOn:Date;
    secondarySkills?:string;
    experience?:String
    location?: {
        locationName:string;
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
      };
    }





export interface ICategory{
    categoryName:string,
    categoryDescription:string,
    isListed:boolean,
    createdAt:Date,
}

export interface IQuestion {
    question: string;
    answer: string;
}


export  interface IQuery {
    isListed: boolean;
    $or: { postName?: RegExp; company?: RegExp }[];
    qualification: RegExp;
    skills: RegExp;
    workArrangementType?: WorkArrangementType; 
    employmentType?: employmentType; 
   }

  export interface ListJobsResponse {
    status: boolean;
    message?: string;
    postDatas?: IPost[];
    page: number;
    totalPages: number;
  }
  
//   export interface IQuery {
//     isListed?: boolean;
//     postName?: RegExp;
//     company?: RegExp;
//     qualification?: RegExp;
//     skills?: RegExp;
//     workArrangementType?: string;
//     employmentType?: string;
//   }



   export interface IRecruiter {
    name: string;
    email: string;
    phone: string;
    password?: string;
    worksAt:string,
    type: AuthType;
    status: boolean;
    isGoogle:boolean;
    createdOn:Date
}

export interface IAdmin {
    name: string;
    email: string;
    password: string;
    type: AuthType;
}
   

export interface ListJobsResult {
    status: boolean;
    postDatas?: IPost[];
    page?: number;
    totalPages?: number;
    message?: string;
    error?: Error;
  }
  
  export interface ListJobsParams { 
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
    qualification?: string;
    skills?: string;
    workArrangementType?: string;
    employmentType?: string;
    userId?: string;
  }

  export interface JobQuery {
    $or?: { [key: string]: any }[];
    skills?: { $regex: string, $options: string };
    qualification?: { $regex: string, $options: string };
    employmentType?: string;
    workArrangementType?: string;
    'recruitingPlace.coordinates'?: {
      $near: {
        $geometry: {
          type: string;
          coordinates: number[];
        };
        $maxDistance: number;
      };
    };
  }
  
