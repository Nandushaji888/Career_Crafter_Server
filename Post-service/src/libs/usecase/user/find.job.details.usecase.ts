import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const findJobDetailsuseCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (id: string) => {
    try {
      const data = await postRepository?.findJobPost(id);
      if (data.status) {
        return { status: data?.status, jobData: data?.jobDetails };
      } else {
        return { status: data?.status, message: data?.message };
      }
    } catch (error) {
      console.log("error in findJobDetailsuseCase ", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
