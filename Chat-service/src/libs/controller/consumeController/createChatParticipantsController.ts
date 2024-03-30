export const createChatParticipantsController = async (
  dependencies: any,
  data: any
) => {
  console.log("ENTERED CONTROLLER");
  console.log(data);

  const {
    useCase: { createChatParticipantsUsecase },
  } = dependencies;
  console.log("ENTER TO createUserController");
  const response = await createChatParticipantsUsecase(
    dependencies
  ).executeFunction(data);
};
