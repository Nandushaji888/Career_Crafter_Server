import user_update_controller from './user.update.controller'
import get_userData_controller from './get.userData.controller'
import saveJobPostController from './save.job.post.controller'
import appliedJobListController from './applied.job.list.controller'
import savedJobListController from './saved.job.list.controller'

export default(dependencies:any)=> {
    return {
        userUpdateController :user_update_controller(dependencies),
        getuserDataController: get_userData_controller(dependencies),
        saveJobPostController:saveJobPostController(dependencies),
        appliedJobListController:appliedJobListController(dependencies),
        savedJobListController:savedJobListController(dependencies)

    }
}