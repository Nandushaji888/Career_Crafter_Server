import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { IUser } from "../../../utils/interfaces/interfaces";

export const createUserController = async (
  dependencies: Dependencies,
  data: IUser
) => {
  try {
    const {
      consumeUsecase: { createUserUsecase },
    } = dependencies;
    const response = await createUserUsecase(dependencies).executeFunction(
      data
    );
  } catch (error) {
    console.log("Error in createUserController", error);
  }
};
