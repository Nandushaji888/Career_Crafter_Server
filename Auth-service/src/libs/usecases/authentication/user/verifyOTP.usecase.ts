import { hashPassword } from "../../../../helper";
import { Dependencies } from "../../../../interfaces/dependency.interface";
import { IUser } from "../../../../interfaces/interface";
import { createUserAccessToken, createUserRefreshToken } from "../../../../utils/jwt/jwt";
export const verifyOTP_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: IUser) => {
    try {
      if (data?.password) {
        const hashedPassword = await hashPassword(data?.password);
        const updatedData = { ...data, password: hashedPassword };

        const addUserData = await authenticationRepository?.createUser(
          updatedData
        );
        if (addUserData.status) {
          const accessToken = createUserAccessToken(
            addUserData,
            process.env.ACCESS_SECRET_KEY!,
            process.env.ACCESS_EXPIRY!
          );
          const refreshToken = createUserRefreshToken(
            addUserData,
            process.env.REFRESH_SECRET_KEY!,
            process.env.REFRESH_EXPIRY!
          );

          return {
            status: true,
            user: addUserData,
            refreshToken: refreshToken,
            accessToken: accessToken,
          };
        }
      } else {
        return {
          status: false,
          messag: "error while creating user in otp verification usecase",
        };
      }
    } catch (error) {
      console.log("Error in generateTokens in userGoogleAuthuseCase", error);
      throw error

    }
  };
  return { executeFunction };
};
