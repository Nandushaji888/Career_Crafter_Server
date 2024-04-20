import { userProducer } from "../../../../events/userProducer";
import { Dependencies } from "../../../../interfaces/dependency.interface";
import { IUser } from "../../../../interfaces/interface";
import { createUserAccessToken, createUserRefreshToken } from "../../../../utils/jwt/jwt";

export const userGoogleAuthuseCase = async (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: IUser) => {
    try {
      const response = await authenticationRepository.findUser(data.email);

      if (response.status) {
        if (response?.user?.isGoogle) {
          return generateTokens(response.user);
        } else {
          const response = await authenticationRepository.isGoogleTrue(
            data.email
          );

          if (response) {
            return generateTokens(response.user);
          } else {
            return { status: false, message: response?.message };
          }
        }
      } else {
        const response = await authenticationRepository?.createUser(data);
        if (response) {
          const googleSignup: boolean = true;
          return generateTokens(response.response, googleSignup);
        }
      }
    } catch (error) {
      console.log("Error in userGoogleAuthuseCase", error);
      return {
        status: false,
        message: "Internal server Error",
      };
    }
  };
  const generateTokens = async (user: IUser, googleSignup?: boolean) => {
    try {
      const user_accessToken = createUserAccessToken(
        user,
        process.env.ACCESS_SECRET_KEY || "",
        process.env.ACCESS_EXPIRY || ""
      );
      const user_refreshToken = createUserRefreshToken(
        user,
        process.env.REFRESH_SECRET_KEY || "",
        process.env.REFRESH_EXPIRY || ""
      );

      if (googleSignup) {
        await userProducer(user, "authTopic", "createUser");

        return {
          status: true,
          user_accessToken,
          user_refreshToken,
          user,
          googleSignup: googleSignup,
        };
      } else {
        return { status: true, user_accessToken, user_refreshToken, user };
      }
    } catch (error) {
      console.log("Error in generateTokens in userGoogleAuthuseCase", error);
      throw error

    }
  };

  return { executeFunction };
};
