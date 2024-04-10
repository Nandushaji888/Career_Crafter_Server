import { sendOTP, hashPassword } from "../../../../helper";
import { Dependencies } from "../../../../interfaces/dependency.interface";
import { IRecruiter } from "../../../../interfaces/interface";

export const addRecruiter_useCases = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: IRecruiter) => {
    try {
      const recruiterExist =
        await authenticationRepository?.recruiterEmailExist(data?.email);

      if (recruiterExist) {
        return { status1: true, message: "Email already exists" };
      }

      const phoneExist = await authenticationRepository.recruiterPhoneExist(
        data?.phone
      );
      if (phoneExist) {
        return { status2: true, message: "Phone Number already exists" };
      }

      const response = await sendOTP(data?.email, data?.name);
      if (response.status) {
        return { status: true, otp: response?.otp, data };
      } else {
        return { status: false, message: "Error in sending verification OTP" };
      }
    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: "An error occurred during user creation",
      };
    }
  };
  return { executeFunction };
};
