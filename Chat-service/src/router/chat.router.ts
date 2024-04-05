import express from "express";
import { verifyUser } from "../utils/verifyToken";
import { chatController } from "../libs/controller";

export default (dependencies: any) => {
  const router = express.Router();

  const {
    sendMessageController,
    getMessagesController,
    get_messaged_users_controller,
    create_chat_conversation_controller,
    conversation_message_count_controller,
    clear_message_count_controller
  } = chatController(dependencies);


  router.get("/:id", verifyUser, getMessagesController);
  router.post("/send/:id", verifyUser, sendMessageController);
  router.get("/users/:id", verifyUser, get_messaged_users_controller);
  router.post(
    "/create-conversation",
    verifyUser,
    create_chat_conversation_controller
  );
  router.get("/conversation-message-count/:id", verifyUser,conversation_message_count_controller);
  router.get("/clear-message-count/:id",verifyUser,clear_message_count_controller)

  return router;
};
