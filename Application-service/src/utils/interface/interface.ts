import { ObjectId } from "mongoose";

export interface IApplication{
    _id?:string,
    name?:string,
    email?:string,
    phone?:string,
    resume?:string,
    jobPostId?:string,
    createdOn?:Date,
    userId?:string,
    status?:ApplicationType,
    questionAnswer?:IQuestion[]

}

export enum ApplicationType{
    Pending="pending",
    Accepted="accepted",
    Rejected="rejected",
}

export interface IQuestion {
    question: string;
    answer: string;
    givenAnswer:string;
}
