import get_all_users_controller from '../admin/get.all.users.controller'
import change_user_status_controller from './change.user.status.controller'
export default(dependencies:any)=> {
    return {

        getAllusersController:get_all_users_controller(dependencies),
        changeUserStatusController:change_user_status_controller(dependencies)


    }
}