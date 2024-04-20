import { Dependencies } from "../../../../interfaces/dependency.interface";

export const protect_route_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (userId: string) => {
    try {
      const response = await authenticationRepository?.findUserById(userId);

      if (response?.status) {
        return { status: response?.status, user: response?.user };
      } else {
        return { status: response?.status, message: response?.message };
      }
    } catch (error) {
      console.log("Error in protect_route_useCase", error);
      throw error

    }
  };
  return { executeFunction };
};
