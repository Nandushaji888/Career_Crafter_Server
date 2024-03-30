import { comparePassword } from "../../../../helper/hashPassword";
import { createAccessToken, createRefreshToken } from "../../../../utils/jwt/jwt";

export const recruiterLogin_useCase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string, password: string) => {
    const response = await authenticationRepository.findRecruiter(email);

    if (!response.status) {
      return { status: false, message: "Email or Password is incorrect" };
    } else {
      const { recruiter } = response;
      //   console.log(recruiter);
      const validPass = await comparePassword(password, recruiter.password);

      if (validPass) {
        const accessToken = createAccessToken(
          recruiter,
          process.env.ACCESS_SECRET_KEY!,
          process.env.ACCESS_EXPIRY!
        );
        const refreshToken = createRefreshToken(
          recruiter,
          process.env.REFRESH_SECRET_KEY!,
          process.env.REFRESH_EXPIRY!
        );
        console.log(accessToken);
        console.log(refreshToken);
        return { status: true, recruiter: recruiter,accessToken:accessToken,refreshToken:refreshToken };
      } else {
        return { status: false, message: "Email or Password is incorrect" };
      }
    }
  };
  return { executeFunction };
};
