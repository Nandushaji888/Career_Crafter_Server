import { IPost } from "../../../utils/interface/interface";

export const createPostUseCase = (dependencies: any) => {
  const {
    repository: { postRepository },
  } = dependencies;

  const executeFunction=async(data:IPost)=>{
        const response = await postRepository.storePost(data)
              //  console.log(response);
                                               
    if (!response.status) {
      return { message: "Error occured in creating post", status: false };
    } else {
      return { message: "Post craeted", status: true };
    }
  }
  return {executeFunction}
};
