import { comparePassword } from "../../../../helper/hashPassword";
import { Dependencies } from "../../../../interfaces/dependency.interface";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../utils/jwt/jwt";

export const adminLogin_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string, password: string) => {
    try {
      const response = await authenticationRepository.findAdmin(email);
      if (!response.status) {
        return { status: false, message: "Email or Password is incorrect" };
      } else {
        const { admin } = response;
        const validPass = await comparePassword(password, admin.password);

        if (validPass) {
          const accessToken = createAccessToken(
            admin,
            process.env.ACCESS_SECRET_KEY!,
            process.env.ACCESS_EXPIRY!
          );
          const refreshToken = createRefreshToken(
            admin,
            process.env.REFRESH_SECRET_KEY!,
            process.env.REFRESH_EXPIRY!
          );
          return {
            status: true,
            admin: admin,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } else {
          return { status: false, message: "Email or Password is incorrect" };
        }
      }
    } catch (error) {
      console.log("error in adminLogin_useCase", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
