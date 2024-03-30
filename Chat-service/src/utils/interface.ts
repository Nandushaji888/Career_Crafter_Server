import { ObjectId } from "mongoose";

export interface IUser {
    _id?:string,
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    status?: boolean;
    isGoogle?:boolean;
    dateOfBirth?:string;
    appliedJobs?:ObjectId;
    savedJobs?:ObjectId;
    aboutYou?:string;
    resume?:string;
    qualification?:string;
    skills?:string;
    profilePic?:string;
    createdOn?:Date;
    editedOn?:Date;
    type?:string
}


export interface IRecruiter {
    _id?: string ;
    name?: string;
    email?: string;
    phone?: string;
    status?: boolean;
    worksAt?: string;
    profilePic?: string;
    createdOn?: Date;
    isPremium?:boolean;
    type?:string

  }
  