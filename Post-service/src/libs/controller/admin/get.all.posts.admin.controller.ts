import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { get_all_posts_usecase },
  } = dependencies;

  const getAllPostsAdminController = async (req: Request, res: Response) => {
    try {
      const response = await get_all_posts_usecase(
        dependencies
      ).executeFunction();

      if (response?.status) {
        return res
          .status(200)
          .json({ staus: response?.status, posts: response?.posts });
      } else {
        return res
          .status(404)
          .json({ status: response?.status, message: "File not found" });
      }
    } catch (error) {
      console.log("Error in get alll posts controller admin", error);

      return res
        .status(500)
        .json({ status: false, message: "Internal Server error" });
    }
  };
  return getAllPostsAdminController;
};
