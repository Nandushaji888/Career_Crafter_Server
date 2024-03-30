import { IUser } from "../../../utils/interface/interface";

export const createUserUsecase = (dependencies: any) => {
    
  const {repository: { userRepository }} = dependencies;
  const executeFunction = async (data: IUser) => {

    // console.log(userRepository);
    
    const response = await userRepository.storeUser(data);
      //  console.log(response);
                                               
    if (!response.status) {
      return { message: "Email is not valid", status: false };
    } else {
      return { message: "User craeted", status: true };
    }

  };

  return { executeFunction };
};