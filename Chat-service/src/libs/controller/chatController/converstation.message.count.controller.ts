import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { conversation_message_count_usecase },
  } = dependencies;
  const conversation_message_count_controller = async (
    req: Request,
    res: Response
  ) => {
    try {
      const senderId = req.params.id;
      const receiverId = req?.user?._id;
      console.log(senderId);
      console.log(receiverId);
      const response = await conversation_message_count_usecase(
        dependencies
      )?.executeFunction(receiverId, senderId);
      if (response?.status) {
        return res
          .status(200)
          .json({ status: true, messageCount: response?.messageCount });
      } else {
        return res.status(401).json({ status: false });
      }
    } catch (error) {
      console.log("error in conversation_message_count_controller", error);

      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  };
  return conversation_message_count_controller;
};
