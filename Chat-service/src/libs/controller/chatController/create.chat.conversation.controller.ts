import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { create_chat_conversation_usecase },
  } = dependencies;
  const create_chat_conversation_controller = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { ids } = req.body;
      const response = await create_chat_conversation_usecase(
        dependencies
      )?.executeFunction(ids);
      if (response?.status) {
        return res.status(201).json({ status: true,conversationExists:response?.conversationExists });
      } else {
        return res.status(500).json({ status: false });
      }
    } catch (error) {
      console.log("error in get messaged users controller", error);

      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  };
  return create_chat_conversation_controller;
};
