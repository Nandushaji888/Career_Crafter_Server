import { Request, Response } from "express";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { recruiter_list_jobs },
  } = dependencies;

  const recruiterListJobsController = async (req: Request, res: Response) => {
    try {
      console.log('reached here');
      
      const id = req.params.id;
      const response = await recruiter_list_jobs(dependencies).executeFunction(
        id
      );
      console.log(response);
      
      if (response?.status) {
        res
          .status(200)
          .json({ status: response?.status, jobList: response?.jobList });
      } else {
        res
          .status(404)
          .json({ status: response?.status, message: response?.message });
      }
    } catch (error) {
      console.log("Error in createUserController", error);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  };
  return recruiterListJobsController;
};
