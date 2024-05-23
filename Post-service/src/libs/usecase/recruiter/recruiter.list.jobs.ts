import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const recruiter_list_jobs = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (id: string) => {
    try {
      const response = await postRepository?.recruiterListJobs(id);

      if (response?.status) {
        return { status: response?.status, jobList: response?.jobList };
      } else {
        return { status: response?.status, message: response?.message };
      }
    } catch (error) {
      console.log("error in recruiter_list_jobs ", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
