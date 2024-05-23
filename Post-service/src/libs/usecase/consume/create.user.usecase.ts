import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { IUser } from "../../../utils/interfaces/interfaces";

export const createUserUsecase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;
  const executeFunction = async (data: IUser) => {
    try {
      const response = await postRepository.storeUser(data);
      if (!response.status) {
        return { message: "Email is not valid", status: false };
      } else {
        return { message: "User created", status: true };
      }
    } catch (error) {
      console.log('error in createUserUsecase',error);
      
    }
  };

  return { executeFunction };
};
