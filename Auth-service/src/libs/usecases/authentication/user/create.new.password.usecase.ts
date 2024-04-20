import { hashPassword } from "../../../../helper";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export const userNewPassword_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string, password: string) => {
    try {
      const newPass = await hashPassword(password);
      const response = await authenticationRepository.setNewPassword(
        email,
        newPass
      );
      if (response.status) {
        return { status: true, message: "Password changed successfully" };
      } else {
        return { status: false, message: response?.message };
      }
    } catch (error) {
      console.log("Error in user new password usecase", error);
      throw error

    }
  };
  return { executeFunction };
};
