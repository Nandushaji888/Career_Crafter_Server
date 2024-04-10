export interface Dependencies {
    useCase: UseCase
    repository: Repository
    consumeUseCase: ConsumeUseCase
  }
  
  export interface UseCase {
    addUser_useCases: Function
    userLogin_useCase: Function
    verifyOTP_useCase: Function
    addRecruiter_useCases: Function
    recruiterLogin_useCase: Function
    recruiter_verifyOTP_useCase: Function
    adminLogin_useCase: Function
    userForgotPassword_useCase: Function
    userNewPassword_useCase: Function
    userGoogleAuthuseCase: Function
    protect_route_useCase: Function
    admin_get_all_recruiters: Function
    admin_get_recruiter_details: Function
    changeRecruiterStatus_useCase: Function
  }
  
  export interface Repository {
    authenticationRepository: AuthenticationRepository
    adminRepository: AdminRepository
  }
  
  export interface AuthenticationRepository {
    userEmailExist: Function
    userPhoneExist: Function
    createUser: Function
    findUser: Function
    createRecruiter: Function
    findRecruiter: Function
    recruiterEmailExist: Function
    recruiterPhoneExist: Function
    findAdmin: Function
    setNewPassword: Function
    isGoogleTrue: Function
    changeStatus: Function
    findUserById: Function
  }
  
  export interface AdminRepository {
    getRecruitersList: Function
    getRecruiterDetails: Function
    changeRecruiterStatus: Function
  }
  
  export interface ConsumeUseCase {
    userStatusChangeUsecase: Function
  }