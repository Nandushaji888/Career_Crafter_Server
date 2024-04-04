export const find_message_controller = async (
  dependencies: any,
  messageId: any
) => {
  const {
    useCase: { find_message_usecase },
  } = dependencies;
  try {
    const response = await find_message_usecase(dependencies)?.executeFunction(
      messageId
    );

    if (response?.status) {
      const { message } = response;
      return { message };
    } else {
      return;
    }
  } catch (error) {
    console.log("error in find_message_controller", error);
  }
};
