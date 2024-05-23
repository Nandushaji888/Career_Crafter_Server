import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const pending_post_count_usecase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async () => {
    try {
      const response = await postRepository?.pendingPost();

      if (response?.status) {
        return { status: response?.status, posts: response?.posts };
      } else {
        return { status: response?.status, message: response?.message };
      }
    } catch (error) {
      console.log("error in pending_post_count_usecase in admin", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
