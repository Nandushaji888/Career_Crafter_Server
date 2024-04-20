import { comparePassword } from "../../../../helper/hashPassword";
import { Dependencies } from "../../../../interfaces/dependency.interface";
import {
  createAdminAccessToken,
  createAdminRefreshToken,
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
        const adminData = {
          _id:admin?._id,
          name:admin?.name,
          email:admin?.email,
          phone:admin.phone,
          type:admin?.type,
          status:admin.status,
        }
        const validPass = await comparePassword(password, admin.password);

        if (validPass) {
          const accessToken = createAdminAccessToken(
            adminData,
            process.env.ACCESS_SECRET_KEY!,
            process.env.ACCESS_EXPIRY!
          );
          const refreshToken = createAdminRefreshToken(
            adminData,
            process.env.REFRESH_SECRET_KEY!,
            process.env.REFRESH_EXPIRY!
          );

          return {
            status: true,
            admin: adminData,
            accessToken: accessToken,
            refreshToken: refreshToken,
          };
        } else {
          return { status: false, message: "Email or Password is incorrect" };
        }
      }
    } catch (error) {
      console.log("error in adminLogin_useCase", error);
      throw error
    }
  };
  return { executeFunction };
};
