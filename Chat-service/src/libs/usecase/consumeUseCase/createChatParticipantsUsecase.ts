import { IRecruiter, IUser } from "../../../utils/interface";

export const createChatParticipantsUsecase = (dependencies: any) => {
  const {
    repository: { chatRepository },
  } = dependencies;
  const executeFunction = async (data: IUser | IRecruiter) => {
    const response = await chatRepository?.creatChatParticipants(data);

    if (!response.status) {
      console.log("error in creating chat participants");
    } else {
      console.log("chat participants created");
    }
  };

  return { executeFunction };
};
