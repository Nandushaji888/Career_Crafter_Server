export const createNotificationController = async (
    dependencies: any,
    data: any
  ) => {
    const {applicationData,content} = data
// console.log('jehjhsjdhf');

    const notificatinData = {
        ...applicationData,content
    }
    const {
      useCase: { create_notification_usecase },
    } = dependencies;
    const response = await create_notification_usecase(
      dependencies
    ).executeFunction(notificatinData);
  };
  