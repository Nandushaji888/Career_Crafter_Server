import create_post_controller from './post.job.controller'
import recruiter_list_jobs_controller from './recruiter.list.jobs.controller'

export default (dependencies:any)=> {
    return {
        createJobPostController:create_post_controller(dependencies),
        recruiterListJobsController:recruiter_list_jobs_controller(dependencies)

    }
}