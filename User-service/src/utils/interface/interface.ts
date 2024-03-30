import { ObjectId } from 'mongoose';


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

export enum employmentType{
    Fulltime='fulltime',
    PartTime='parttime',
    Internship='internship'
}

export interface IPost {
    _id:string;
    postName?: string;
    company?: string;
    createdAt?:Date;
    employmentType?:employmentType;
    isPremium?:boolean;
    isListed?:boolean;
    closingDate?:Date;
    skills?:string;
    qualification?:string;
    
    recruitingPlace?:{
        locationName:string;
        type: 'Point';
        coordinates: [number, number]; 
    }
    // category?:ObjectId;

}

export interface MulterS3File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    bucket: string;
    key: string;
    acl: string;
    contentType: string;
    contentDisposition?: null | string;
    storageClass?: null | string;
    serverSideEncryption?: null | string;
    metadata: { [key: string]: any };
    location: string;
    etag: string;
  }
  