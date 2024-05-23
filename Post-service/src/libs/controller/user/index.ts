import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import find_job_controller from "./find.job.details.controller";
import getAllPosts from "./get.all.post.controller";

export default (dependencies: Dependencies) => {
  return {
    findJobDetailsController: find_job_controller(dependencies),
    getAllPosts: getAllPosts(dependencies),
  };
};
