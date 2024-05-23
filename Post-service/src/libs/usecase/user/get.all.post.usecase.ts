import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { WorkArrangementType, employmentType } from "../../../utils/interfaces/enum";


export const get_All_Posts_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (
    page: number,
    limit: number,
    search: string,
    location: string,
    qualification: string,
    skills: string,
    workArrangementType: WorkArrangementType,
    employmentType: employmentType,
    userId: string
  ) => {
    try {
      const response = await postRepository?.listJobs(
        page,
        limit,
        search,
        location,
        qualification,
        skills,
        workArrangementType,
        employmentType,
        userId
      );

      if (response.status) {
        return {
          status: response?.status,
          postDatas: response?.postDatas,
          page: response?.page,
          totalPages: response?.totalPages,
        };
      } else {
        return { status: response?.status, message: response?.message };
      }
    } catch (error) {
      console.log("error in get_All_Posts_useCase ", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
