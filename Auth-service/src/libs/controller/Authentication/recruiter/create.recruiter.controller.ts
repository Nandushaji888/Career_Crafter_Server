import { Response, Request, NextFunction } from "express";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { addRecruiter_useCases },
  } = dependencies;

  const createRecruiterController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name, email, phone, password, worksAt } = req.body.values;
      const data = {
        name: name,
        email: email,
        phone: phone,
        worksAt: worksAt,
        password: password,
      };

      const response = await addRecruiter_useCases(
        dependencies
      ).executeFunction(data);

      if (response?.status) {
        const { data, otp } = response;
        req.session.recruiterData = data;
        req.session.rOtp = otp;
        res.json({
          status: response?.status,
        });
      } else {
        res.json({ status: false, message: response?.message });
      }
    } catch (error) {
      console.log("error in createRecruiterController", error);
      next(error);
    }
  };
  return createRecruiterController;
};
