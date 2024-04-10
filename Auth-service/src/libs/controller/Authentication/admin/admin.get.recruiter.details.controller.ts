import { Request, Response } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { admin_get_recruiter_details },
  } = dependencies;
  const getRecruiterDetailsController = async (req: Request, res: Response) => {
    try {
      const recruiterId = req.params.id;
      const response = await admin_get_recruiter_details(
        dependencies
      ).executeFunction(recruiterId);

      if (response?.status) {
        return res
          .status(200)
          .json({ status: true, recruiter: response?.recruiter });
      } else {
        return res
          .status(404)
          .json({ status: false, message: response?.message });
      }
    } catch (error) {
      console.log("error in admin get recruiter details controller", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal servor error" });
    }
  };
  return getRecruiterDetailsController;
};
