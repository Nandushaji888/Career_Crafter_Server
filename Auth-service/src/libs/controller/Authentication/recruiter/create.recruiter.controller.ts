import { Response, Request } from "express";

export default (dependencies: any) => {
  const {
    useCase: { addRecruiter_useCases },
  } = dependencies;

  const createRecruiterController = async (req: Request, res: Response) => {
    const { name, email, phone, password,worksAt } = req.body.values;

    console.log(req.body);

    const data = {
      name: name,
      email: email,
      phone: phone,
      worksAt:worksAt,
      password: password,
    };
    // console.log("data", data);

    const response = await addRecruiter_useCases(dependencies).executeFunction(data);
    // console.log(response);

    if (response?.status) {
      const{data ,otp }= response
      req.session.recruiterData = data
      req.session.rOtp = otp
      res.json({
        status: response?.status,
      });
    } else {
      console.log(response.message);

      res.json({ status: false, message: response?.message });
    }
  };
  return createRecruiterController;
};
