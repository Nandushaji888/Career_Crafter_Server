import { hashPassword } from "../../../../helper";
import { Dependencies } from "../../../../interfaces/dependency.interface";
import { IRecruiter } from "../../../../interfaces/interface";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../utils/jwt/jwt";
export const recruiter_verifyOTP_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: IRecruiter) => {
    try {
      if (data?.password) {
        const hashedPassword = await hashPassword(data?.password);

        const updatedData = { ...data, password: hashedPassword };
        const addRecruiterData =
          await authenticationRepository?.createRecruiter(updatedData);

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
          return {
            status: true,
            recruiter: addRecruiterData,
            refreshToken: refreshToken,
            accessToken: accessToken,
          };
        }
      } else {
        return {
          status: false,
          messag: "error while creating recruiter in otp verification usecase",
        };
      }
    } catch (error) {
      console.log("error in recruiter_verifyOTP_useCase", error);

      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
