import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const get_all_posts_usecase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async () => {
    try {
      const response = await postRepository?.getAllPostsAdmin();

      if (response?.status) {
        return { status: response?.status, posts: response?.posts };
      } else {
        return { status: response?.status };
      }
    } catch (error) {
      console.log("error in getallPostsUsecase in admin", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
