import { ObjectId } from 'mongoose';


export enum WorkArrangementType{
    Remote='remote',
    Hybrid='hybrid',
    Office='office'
}

export enum employmentType{
    Fulltime='fulltime',
    PartTime='parttime',
    Internship='internship'
}

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
    recruitingPlace?:{
        locationName:string;
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
      },

  
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

export enum AuthType {
    User = 'user',
    Admin = 'admin',
    Recruiter = 'recruiter'
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

