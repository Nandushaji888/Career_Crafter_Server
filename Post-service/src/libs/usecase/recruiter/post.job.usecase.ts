import { Dependencies } from "../../../utils/interfaces/dependency.interface";
import { IPost } from "../../../utils/interfaces/interfaces";

export const createPost_useCase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (data: IPost) => {
    try {
      const postData = await postRepository?.createPost(data);
      if (postData.status) {
        return {
          status: true,
          postData: postData?.response,
          message: "Job Post created successfully",
        };
      } else {
        return { status: false, message: "Error in creating Job post" };
      }
    } catch (error) {
      console.log("error in createPost_useCase ", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
