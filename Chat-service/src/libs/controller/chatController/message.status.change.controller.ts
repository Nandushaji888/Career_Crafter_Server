import { Response, Request } from "express";

export const changeMessageStatusController = async(
  dependencies: any,
  messageId: string
) => {
  const {
    useCase: { change_message_status_usecase },
  } = dependencies;

  try {
    const response = await change_message_status_usecase(
      dependencies
    )?.executeFunction(messageId);

    if (response?.status) {
      return response?.message;
    } else return;
  } catch (error) {
    console.log("error in message status change controller", error);
    return;
  }

  return changeMessageStatusController;
};
