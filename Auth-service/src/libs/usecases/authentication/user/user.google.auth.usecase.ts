import { IUser } from "../../../../utils/interfaces/interface";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../../utils/jwt/jwt";

export const userGoogleAuthuseCase = async (dependencies: any) => {
  const {
    repository: { authenticationRepository },
  } = dependencies;

  const executeFunction = async (data: IUser) => {
    // console.log(data);
    const response = await authenticationRepository.findUser(data.email);

    if (response.status) {
      if (response?.user?.isGoogle) {
        return generateTokens(response.user);
      } else {
        const response = await authenticationRepository.isGoogleTrue(
          data.email
        );

        if (response) {
          return generateTokens(response.user);
        } else {
          return { status: false, message: response?.message };
        }
      }
    } else {
      const response = await authenticationRepository?.createUser(data);
      if (response) {
        console.log('response in usecase');
        console.log(response);
        
        const googleSignup:boolean=true
        return generateTokens(response.response,googleSignup);
      }
    }
 
  };
  const generateTokens = (user: IUser,googleSignup?:boolean) => {
    const user_accessToken = createAccessToken(
      user,
      process.env.ACCESS_SECRET_KEY || "",
      process.env.ACCESS_EXPIRY || ""
    );
    const user_refreshToken = createRefreshToken(
      user,
      process.env.REFRESH_SECRET_KEY || "",
      process.env.REFRESH_EXPIRY || ""
    );
    if(googleSignup){

      return { status: true, user_accessToken, user,googleSignup:googleSignup };
    }else{
      return { status: true, user_accessToken, user };

    }
  };

  return { executeFunction };
};
