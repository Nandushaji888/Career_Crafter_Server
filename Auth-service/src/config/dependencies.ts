import {
  ConsumeUseCase,
  Repository,
  UseCase,
} from "../interfaces/dependency.interface";
import {
  authenticationRepository,
  adminRepository,
} from "../libs/app/repository";

import {
  addUser_useCases,
  userLogin_useCase,
  verifyOTP_useCase,
  addRecruiter_useCases,
  recruiterLogin_useCase,
  recruiter_verifyOTP_useCase,
  adminLogin_useCase,
  userForgotPassword_useCase,
  userNewPassword_useCase,
  userGoogleAuthuseCase,
  userStatusChangeUsecase,
  protect_route_useCase,
  admin_get_all_recruiters,
  admin_get_recruiter_details,
  changeRecruiterStatus_useCase,
} from "../libs/usecases";

const useCase: UseCase = {
  addUser_useCases,
  userLogin_useCase,
  verifyOTP_useCase,
  addRecruiter_useCases,
  recruiterLogin_useCase,
  recruiter_verifyOTP_useCase,
  adminLogin_useCase,
  userForgotPassword_useCase,
  userNewPassword_useCase,
  userGoogleAuthuseCase,
  protect_route_useCase,
  admin_get_all_recruiters,
  admin_get_recruiter_details,
  changeRecruiterStatus_useCase,
};
const repository: Repository = {
  authenticationRepository,
  adminRepository,
};
const consumeUseCase: ConsumeUseCase = {
  userStatusChangeUsecase,
};

export default {
  useCase,
  repository,
  consumeUseCase,
};
