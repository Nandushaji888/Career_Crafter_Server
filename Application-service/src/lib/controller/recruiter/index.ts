import get_job_applications_controller from './get.job.applications.controller'
import get_application_details_controller from './get.application.details.controller'
import change_application_status_controller from './change.application.status.controller'

export default(dependencies:any)=> {
    return {
        getJobApplicationsController :get_job_applications_controller(dependencies),
        getApplicationDetailsController :get_application_details_controller(dependencies),
        changeApplicationStatusController :change_application_status_controller(dependencies),
    }
} 