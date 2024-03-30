import { Request, Response } from "express";

export const createUserController = async (dependencies: any, data: any) => {
  // console.log("ENTERED CONTROLLER");
  // console.log(data);
  
  const {
    consumeUsecase: { createUserUsecase },
  } = dependencies;
  // console.log("ENTER TO createUserController");
  const response = await createUserUsecase(dependencies).executeFunction(data);
  // console.log(response);
};