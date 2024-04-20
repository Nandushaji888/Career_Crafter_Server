import { sendOTP } from "../../../../helper";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export const userForgotPassword_useCase = (dependencies: Dependencies) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (email: string) => {
    try {
      const user = await authenticationRepository?.findUser(email);

      if (user) {
        const response = await sendOTP(email, user?.name);
        if (response.status) {
          console.log(response);

          return { status: true, otp: response.otp, user: user };
        } else {
          return {
            status: false,
            message: "Error in sending verification OTP",
          };
        }
      } else {
        return {
          status: false,
          message: `This email isn't registered with us `,
        };
      }
    } catch (error) {
      console.log("Error in userForgotPassword_useCase", error);
      throw error

    }
  };
  return { executeFunction };
};
