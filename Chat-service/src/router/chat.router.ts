import express from "express";
import { verifyUser } from "../utils/verifyToken";
import {chatController} from '../libs/controller'



export default (dependencies:any)=> {
    const router = express.Router();

    const {sendMessageController,getMessagesController,get_messaged_users_controller} = chatController(dependencies)
    router.get("/:id",verifyUser, getMessagesController);
    router.post("/send/:id",verifyUser, sendMessageController);
    router.get("/users/:id",verifyUser,get_messaged_users_controller);
    
    return router
}
