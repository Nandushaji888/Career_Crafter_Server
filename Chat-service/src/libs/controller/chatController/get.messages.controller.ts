import { Request, Response } from "express";
export default (dependencies: any) => {


  const {
    useCase: { get_messages_usecase },
  } = dependencies;
  
  const getMessagesController = async (req: Request, res: Response) => {
    try {      
      const {id:userToChatId} = req.params
      const senderId = req.user?._id
      // const senderId='65f7ba9774c69760a813d1fa'
      console.log(userToChatId);
      console.log(senderId);

      const response = await get_messages_usecase(dependencies)?.executeFunction(
        senderId,
        userToChatId,
      );

      if (response?.status) {
        console.log('response in get messagesd controller');
        console.log(response);
        
        res.status(200).json(response?.messages);
      }
    } catch (error) {
      console.log("Error in getMessage controller", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  return getMessagesController
};
