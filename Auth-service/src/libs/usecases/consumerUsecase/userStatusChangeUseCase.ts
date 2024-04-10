import { Dependencies } from "../../../interfaces/dependency.interface";
import { statusData } from "../../../interfaces/interface";

export const userStatusChangeUsecase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: statusData) => {
    try {
      const response = await authenticationRepository?.changeStatus(data);

      if (response?.status) {
        return {
          status: response?.status,
          user: response?.user,
          message: response?.message,
        };
      } else {
        return { status: response?.status, message: response?.message };
      }
    } catch (error) {
      console.log("error in userStatusChangeUsecase", error);
    }
  };
  return { executeFunction };
};
