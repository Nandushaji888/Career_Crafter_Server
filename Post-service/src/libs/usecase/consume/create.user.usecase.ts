import { IUser } from "../../../utils/interfaces/interfaces";

export const createUserUsecase = (dependencies: any) => {
    
  const {repository: { postRepository }} = dependencies;
  const executeFunction = async (data: IUser) => {

    // console.log(postRepository);
    
    const response = await postRepository.storeUser(data);
      //  console.log(response);
                                               
    if (!response.status) {
      return { message: "Email is not valid", status: false };
    } else {
      return { message: "User craeted", status: true };
    }

  };

  return { executeFunction };
};