import { postProducer } from "../../../events/postProducer";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export const poststatus_change_usecase = (dependencies: Dependencies) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction = async (
    id: string,
    status: string,
    rejectedReason: string
  ) => {
    try {
      const response = await postRepository?.changeStatus(
        id,
        status,
        rejectedReason
      );

      if (response?.status) {
        if (response?.postData) {
          const { postData } = response;
          await postProducer(postData, "postTopic", "createPost");
        }
        return {
          status: response?.status,
          postData: response?.postData,
          message: response?.message,
        };
      } else {
        return { status: response?.status, message: response?.message };
      }
    } catch (error) {
      console.log("error in poststatus_change_usecase ", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
