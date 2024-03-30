export const get_messaged_users_usecase = (dependencies: any) => {
  const {
    repository: { chatRepository },
  } = dependencies;

  const executeFunction = async (userId: string) => {
    const res = await chatRepository?.messagedUsers(userId);

    if (res?.status) {
      return { status: res?.status, messagedUser: res?.messagedUsers };
    } else {
      return {status:res?.status,code:res?.code};
    }
  };
  return {executeFunction}
};
