export const create_notification_usecase = (dependencies: any) => {
  const {
    repository: { notificationRepository },
  } = dependencies;

  const executeFunction = async (data: any) => {
    try {
        const response = await notificationRepository?.createNotification(data)
        
    } catch (error) {
      console.log("error in create_notification_usecase", error);
      return { status: false };
    }
  }
  return {executeFunction}
};
