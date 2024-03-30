

export const createPostController = async (dependencies: any, data: any) => {
  // console.log("createPost controller");
  // console.log(data);
  
  const {
    consumeUsecase: { createPostUseCase },
  } = dependencies;
  // console.log("createPost controller22222");

  const response = await createPostUseCase(dependencies).executeFunction(data);
  console.log(response);
};