import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import create_post_controller from "./post.job.controller";
import recruiter_list_jobs_controller from "./recruiter.list.jobs.controller";

export default (dependencies: Dependencies) => {
  return {
    createJobPostController: create_post_controller(dependencies),
    recruiterListJobsController: recruiter_list_jobs_controller(dependencies),
  };
};
