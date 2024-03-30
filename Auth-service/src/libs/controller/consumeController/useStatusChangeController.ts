import { statusData } from "../../../utils/interfaces/interface";

export const userStatusChangeController = async(dependencies:any,data:statusData)=>{


    const {consumeUseCase:{userStatusChangeUsecase}} =dependencies

    const response = await userStatusChangeUsecase(dependencies).executeFunction(data)
    response.clearCookie('user_accessToken')
    response.clearCookie('user_refreshToken')
    // console.log('response in controller');
    // console.log(response);
    
}