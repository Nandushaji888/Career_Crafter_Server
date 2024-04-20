import { Request,Response,NextFunction, } from "express";

const ErrorHandler = (err:any,req:Request,res:Response,next:NextFunction)=> {
    console.log('reached error handler');
    
    const errStatus = err.statusCode||500;
    const errMsg= err.message ||"Something went wrong";
    console.log(`Error:${errStatus} --> ${errMsg} --> ${err?.stack}`);
     
    return res.status(errStatus).json({status:false,message:errMsg})
}

export default ErrorHandler