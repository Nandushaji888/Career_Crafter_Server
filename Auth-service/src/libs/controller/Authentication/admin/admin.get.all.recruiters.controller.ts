import { NextFunction, Request, Response } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { admin_get_all_recruiters },
  } = dependencies;

  const getRecruiterListController = async (req: Request, res: Response,next:NextFunction) => {
    try {
      const response = await admin_get_all_recruiters(
        dependencies
      ).executeFunction();

      if (response?.status) {
        return res
          .status(200)
          .json({ staus: true, recruiters: response?.recruiters });
      } else {
        return res
          .status(404)
          .json({ staus: true, message: response?.message });
      }
    } catch (error) {
      console.log("error in get recruiters in admin controller", error);
      next(error);

    }
  };
  return getRecruiterListController;
};
