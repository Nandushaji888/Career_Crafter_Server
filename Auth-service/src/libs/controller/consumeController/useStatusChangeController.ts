import { Dependencies } from "../../../interfaces/dependency.interface";
import { statusData } from "../../../interfaces/interface";

export const userStatusChangeController = async (
  dependencies: Dependencies,
  data: statusData
) => {
  try {
    const {
      consumeUseCase: { userStatusChangeUsecase },
    } = dependencies;

    const response = await userStatusChangeUsecase(
      dependencies
    ).executeFunction(data);
    response.clearCookie("user_accessToken");
    response.clearCookie("user_refreshToken");
  } catch (error) {
    console.log(error, "Error in userStatusChangeController");
  }
};
