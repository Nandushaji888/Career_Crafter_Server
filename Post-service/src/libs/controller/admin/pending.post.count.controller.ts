import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { pending_post_count_usecase },
  } = dependencies;

  const pendingPostCountController = async (req: Request, res: Response) => {
    try {
      const response = await pending_post_count_usecase(
        dependencies
      )?.executeFunction();

      if (response?.status) {
        res
          .status(200)
          .json({ status: response?.status, posts: response?.posts });
      } else {
        res
          .status(404)
          .json({ status: response?.status, message: response?.message });
      }
    } catch (error) {
      console.log("Error in pendingPostCountController", error);

      return res
        .status(500)
        .json({ status: false, message: "Internal Server error" });
    }
  };
  return pendingPostCountController;
};
