import express from "express";
import { verifyUser } from "../utils/verifyToken";
import {notificationController} from '../libs/controller'



export default (dependencies:any)=> {
    const {get_all_notifications_by_userId_controller} =notificationController(dependencies)
    const router = express.Router();

    router.get("/:id",verifyUser, get_all_notifications_by_userId_controller);

    
    return router
}
