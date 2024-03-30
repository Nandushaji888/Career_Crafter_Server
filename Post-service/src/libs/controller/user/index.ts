import find_job_controller from './find.job.details.controller'
import getAllPosts from './get.all.post.controller'

export default (dependencies:any)=> {
    return {
        findJobDetailsController:find_job_controller(dependencies),
        getAllPosts :getAllPosts(dependencies)

    }
}