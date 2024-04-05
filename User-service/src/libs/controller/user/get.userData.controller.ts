import { Response, Request } from "express";
import axios from "axios";

export default (dependencies: any) => {
  const {
    useCase: { get_userData_useCase },
  } = dependencies;

  const getUserDataController = async (req: Request, res: Response) => {
    try {
      console.log("reached get user data controller");

      const id = req.params.id;
      const response = await get_userData_useCase(dependencies).executeFunction(
        id
      );
      console.log(response);

      if (response.status) {
        return res
          .status(200)
          .json({ status: response?.status, user: response?.user });
      } else {
        return res
          .status(404)
          .json({ status: response?.status, message: response?.message });
      }
    } catch (error) {
      console.log("error in getUserDataController", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  return getUserDataController;
};
