import { ObjectId } from 'mongoose';
import { AuthType, WorkArrangementType, employmentType } from './enum';




export interface IPost {
    postName?: string;
    company?: string;
    responsibilities?:string,
    jobDescription?:string,
    skillsRequired?:string,
    qualification?:string,
    salary?:string,
    category?:ObjectId,
    questions?:IQuestion[],
    skills?:string,
    recruiterEmail?:string,
    createdAt?:Date,
    closingDate?:Date,
    workArrangementType?:WorkArrangementType,
    employmentType?:employmentType,
    isPremium?:boolean,
    isListed?:boolean,
    recruiterId?:string,
    isRejected?:boolean,
    rejectedReason?:string;
    recruitingPlace?:recruitingPlace

  
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
   
