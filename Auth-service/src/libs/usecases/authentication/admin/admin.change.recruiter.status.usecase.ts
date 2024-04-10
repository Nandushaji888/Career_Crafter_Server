import { Dependencies } from "../../../../interfaces/dependency.interface";

export const changeRecruiterStatus_useCase = (dependencies: Dependencies) => {
  const {
    repository: { adminRepository },
  } = dependencies;
  const executeFunction = async (recruiterId: string, status: boolean) => {
    try {
      const res = await adminRepository?.changeRecruiterStatus(
        recruiterId,
        status
      );
      if (res?.status) {
        return {
          status: res?.status,
          recruiters: res?.recruiters,
          message: res?.message,
        };
      } else {
        return { status: res?.status, message: res?.message };
      }
    } catch (error) {
      console.log("error in change user status usecase", error);

      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
