import { Request, Response } from "express";
import { getReceiverSocketId, io } from "../../../socket/socket";
export default (dependencies: any) => {
  const {
    useCase: { send_message_usecase },
  } = dependencies;

  const sendMessageController = async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      const { id: receiverId } = req.params;

      const senderId = req.user?._id;

      console.log('message');
      console.log(message);
      console.log('receiverId');
      console.log(receiverId);
      console.log('senderId');
      console.log(senderId);
      
      
      
      const response = await send_message_usecase(
        dependencies
      )?.executeFunction(senderId, receiverId, message);

      if (response?.status) {
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          //to send message to this particular receiverId
          io.to(receiverSocketId).emit("newMessage", response?.newMessage);
        }
        res.status(201).json(response?.newMessage);
      }
    } catch (error) {
      console.log("Error in sendMessage controller", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  return sendMessageController;
};
