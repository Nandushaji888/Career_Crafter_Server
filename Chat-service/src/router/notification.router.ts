import express from "express";
import { verifyUser } from "../utils/verifyToken";
import {notificationController} from '../libs/controller'



export default (dependencies:any)=> {
    const {get_all_notifications_by_userId_controller,change_read_status_controller,notification_and_message_count_controller} =notificationController(dependencies)
    const router = express.Router();

    router.get("/:id",verifyUser, get_all_notifications_by_userId_controller);
    router.put('/mark-read',verifyUser,change_read_status_controller)
    router.get('/count/:id',verifyUser,notification_and_message_count_controller)


    
    return router
}
