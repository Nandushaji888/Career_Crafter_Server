export const addAppliedJob_usecase = (dependencies: any) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction = async (userId: string, jobPostId: string) => {
    const response = await userRepository.addAppliedJobId(jobPostId, userId);
    if (response) {
      return { status: response?.status };
    }
  };
  return { executeFunction };
};
