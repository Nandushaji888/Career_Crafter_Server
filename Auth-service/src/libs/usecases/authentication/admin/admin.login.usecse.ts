import { comparePassword } from "../../../../helper/hashPassword";
import { createAccessToken, createRefreshToken } from "../../../../utils/jwt/jwt";

export const adminLogin_useCase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string, password: string) => {
    console.log('reached hereeee');
    
    const response = await authenticationRepository.findAdmin(email);
    console.log(response);
    

    if (!response.status) {
      return { status: false, message: "Email or Password is incorrect" };
    } else {
      const { admin } = response;
      //   console.log(recruiter);
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
        console.log(accessToken);
        console.log(refreshToken);
        return { status: true, admin: admin,accessToken:accessToken,refreshToken:refreshToken };
      } else {
        return { status: false, message: "Email or Password is incorrect" };
      }
    }
  };
  return { executeFunction };
};
