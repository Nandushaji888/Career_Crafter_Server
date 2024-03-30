import { comparePassword } from "../../../../helper/hashPassword";
import { createAccessToken, createRefreshToken } from "../../../../utils/jwt/jwt";

export const userLogin_useCase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string, password: string) => {
    const response = await authenticationRepository?.findUser(email);

    if (!response.status) {
      return { status: false, message: response?.message };
    } else {
      const { user } = response;
      //   console.log(user);
      const validPass = await comparePassword(password, user.password);

      if (validPass) {
        const user_accessToken = createAccessToken(
          user,
          process.env.ACCESS_SECRET_KEY || '',
          process.env.ACCESS_EXPIRY || ''
        );
        const user_refreshToken = createRefreshToken(
          user,
          process.env.REFRESH_SECRET_KEY ||'',
          process.env.REFRESH_EXPIRY ||''
        );
        // console.log(accessToken);
        // console.log(refreshToken);
        return { status: true, user: user,user_accessToken:user_accessToken,user_refreshToken:user_refreshToken };
      } else {
        return { status: false, message: "Email or Password is incorrect" };
      }
    }
  };
  return { executeFunction };
};
