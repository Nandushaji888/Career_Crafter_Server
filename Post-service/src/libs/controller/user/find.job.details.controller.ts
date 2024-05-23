import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { findJobDetailsuseCase },
  } = dependencies;

  const findJobDetailsController = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = await findJobDetailsuseCase(dependencies).executeFunction(
        id
      );

      if (data?.status) {
        return res
          .status(200)
          .json({ status: data?.status, jobData: data?.jobData });
      } else {
        return res
          .status(404)
          .json({ status: data?.status, message: data?.message });
      }
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  };
  return findJobDetailsController;
};
