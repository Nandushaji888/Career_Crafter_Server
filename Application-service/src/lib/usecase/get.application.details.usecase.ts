export const get_application_details_usecase = (dependencies: any) => {
  const {
    repository: { applicationRespository },
  } = dependencies;

  const executeFunction = async (applicationId: string) => {
    const response = await applicationRespository.getApplicationDetails(
      applicationId
    );

    if (response?.status) {
      return { status: response?.status, application: response?.application };
    } else {
      return { status: response?.status, message: response?.message };
    }
  };
  return { executeFunction };
};
