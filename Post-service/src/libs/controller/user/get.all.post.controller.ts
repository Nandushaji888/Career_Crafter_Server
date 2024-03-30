import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { get_All_Posts_useCase },
  } = dependencies;
  const getAllPosts = async (req: Request, res: Response) => {
    try {
      
      const {
        page = 1,
        limit = 2,
        search =  "",
        qualification = "",
        location ="",
        skills = "",
        workArrangementType = "",
        employmentType = "",
        userId
      } = req.query;


      const response = await get_All_Posts_useCase(
        dependencies
      ).executeFunction(page, limit, search,location,qualification,skills,workArrangementType,employmentType,userId);

      // console.log(response);
      
      if (response.status) {
        res.status(200).json({
          status: response?.status,
          postDatas: response?.postDatas,
          page: response?.page,
          totalPages: response?.totalPages,
        });
      } else {
        res
          .status(404)
          .json({ status: response?.status, message: response?.message });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  };
  return getAllPosts;
};
