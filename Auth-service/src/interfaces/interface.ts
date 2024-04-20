export enum AuthType {
    User = 'user',
    Admin = 'admin',
    Recruiter = 'recruiter'
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
    password?: string;
    type: AuthType;
    status: boolean;
    isGoogle:boolean;
    createdOn:Date;
    location?: {
        locationName:string;
        type: 'Point';
        coordinates: [number, number];
      };
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
    password?: string;
    phone?:string;
    status?:boolean;
    type: AuthType;
}

export interface statusData{
    id:string,
    status:string
}







  