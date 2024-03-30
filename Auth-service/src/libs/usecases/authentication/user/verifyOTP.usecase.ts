import { hashPassword } from "../../../../helper";
import { createAccessToken, createRefreshToken } from "../../../../utils/jwt/jwt";
export const verifyOTP_useCase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: any) => {
    console.log(data.password);

    const hashedPassword = await hashPassword(data?.password);
    const updatedData = { ...data, password: hashedPassword };

    const addUserData = await authenticationRepository?.createUser(updatedData);
    if (addUserData.status) {
      const accessToken = createAccessToken(
        addUserData,
        process.env.ACCESS_SECRET_KEY!,
        process.env.ACCESS_EXPIRY!
      );
      const refreshToken = createRefreshToken(
        addUserData,
        process.env.REFRESH_SECRET_KEY!,
        process.env.REFRESH_EXPIRY!
      );
      // console.log(accessToken);
      // console.log(refreshToken);
      
      return { status: true, user: addUserData,refreshToken :refreshToken,accessToken:accessToken };
    } else {
      return { status: false, messag: "error while creating user in otp verification usecase" };
    }
  };
  return { executeFunction };
};
