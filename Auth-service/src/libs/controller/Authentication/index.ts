import create_user_controller from './user/create.user.controller'
import user_login_controler from './user/user.login.controller'
import verify_otp_controller from './user/verifyOTP.controller'
import create_recruiter_controller from './recruiter/create.recruiter.controller'
import recruiter_login_controller from './recruiter/recruiter.login.controller'
import verify_recruiter_otp_controller from './recruiter/verifyOTP.recruiter.controller'
import user_logout_controller from './user/user.logout.controller'
import admin_login_controller from './admin/admin.login.controller'
import admin_logout_controller from './admin/admin.logout.controller'
import recruiter_logout_controller from './recruiter/recruiter.logout.controller'
import resendotp_controller from './resendOPT.controller'
import user_forgot_password_controller from './user/user.forgot.password.controller'
import ft_otp_otp_verify from './user/fp.otp.verify.controller'
import user_create_new_pass_controller from './user/create.new.pass.controller'
import user_google_signin_controller from './user/google.signin.controller'
import getRecruiterListController from './admin/admin.get.all.recruiters.controller'
import changeRecruiterStatusController from './admin/admin.change.recruiter.status.controller'
import getRecruiterDetailsController from './admin/admin.get.recruiter.details.controller'

export default (dependencies:any)=>{
    return{
        createUserController:create_user_controller(dependencies),
        userLoginController:user_login_controler(dependencies),
        verifyOTPController:verify_otp_controller(dependencies),
        createRecruiterController:create_recruiter_controller(dependencies),
        recruiterLoginController:recruiter_login_controller(dependencies),
        verifyRecruiterOTPController:verify_recruiter_otp_controller(dependencies),
        userLogoutController:user_logout_controller(dependencies),
        adminLoginController:admin_login_controller(dependencies),
        adminLogoutController:admin_logout_controller(dependencies),
        recruiterLogoutController:recruiter_logout_controller(dependencies),
        resendOTPController:resendotp_controller(dependencies),
        forgotPasswordController:user_forgot_password_controller(dependencies),
        fpOTPVerifyController :ft_otp_otp_verify(dependencies),
        userCreateNewPassController:user_create_new_pass_controller(dependencies),
        userGoogleSigninController :user_google_signin_controller(dependencies),
        getRecruiterListController:getRecruiterListController(dependencies),
        changeRecruiterStatusController:changeRecruiterStatusController(dependencies),
        getRecruiterDetailsController:getRecruiterDetailsController(dependencies),
        


    }
}