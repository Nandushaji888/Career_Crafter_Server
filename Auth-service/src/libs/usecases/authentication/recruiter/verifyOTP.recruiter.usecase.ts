import { hashPassword } from "../../../../helper";
import { createAccessToken, createRefreshToken } from "../../../../utils/jwt/jwt";
export const recruiter_verifyOTP_useCase = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: any) => {
    console.log(data.password);

    const hashedPassword = await hashPassword(data?.password);
    const updatedData = { ...data, password: hashedPassword };

    const addRecruiterData = await authenticationRepository?.createRecruiter(updatedData);
    if (addRecruiterData.status) {
      const accessToken = createAccessToken(
        addRecruiterData,
        process.env.ACCESS_SECRET_KEY!,
        process.env.ACCESS_EXPIRY!
      );
      const refreshToken = createRefreshToken(
        addRecruiterData,
        process.env.REFRESH_SECRET_KEY!,
        process.env.REFRESH_EXPIRY!
      );
      console.log(accessToken);
      console.log(refreshToken);
      
      return { status: true, recruiter: addRecruiterData,refreshToken :refreshToken,accessToken:accessToken };
    } else {
      return { status: false, messag: "error while creating recruiter in otp verification usecase" };
    }
  };
  return { executeFunction };
};
