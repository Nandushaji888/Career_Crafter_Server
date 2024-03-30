import { sendOTP, hashPassword } from "../../../../helper";
import { IUser } from "../../../../utils/interfaces/interface";

export const addUser_useCases = (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: IUser) => {
    try {
      const userExist = await authenticationRepository?.userEmailExist(
        data?.email
      );

      if (userExist) {
        return { status1: true, message: "Email already exists" };
      }

      const phoneExist = await authenticationRepository.userPhoneExist(
        data?.phone
      );
      console.log(phoneExist);

      if (phoneExist) {
        return { status2: true, message: "Phone Number already exists" };
      }

      const response = await sendOTP(data?.email,data?.name);
      console.log(response);

      if (response.status) {
        return { status: true, otp: response?.otp, data };
      } else {
        return { status: false, message:"Error in sending Verification OTP"};
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
