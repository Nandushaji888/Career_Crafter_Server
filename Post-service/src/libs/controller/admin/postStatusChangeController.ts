import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { poststatus_change_usecase },
  } = dependencies;

  const postStatusChangeController = async (req: Request, res: Response) => {
    try {
   
      
      const { id, status,rejectedReason } = req.body?.formData;


      const response = await poststatus_change_usecase(
        dependencies
      ).executeFunction(id, status,rejectedReason);

      
      if (response.status) {
        res
          .status(200)
          .json({
            status: response?.status,
            postData: response?.postData,
            message: response?.message,
          });
      } else {
        res.json({ status: response?.status, message: response?.message });
      }
    } catch (error) {
      console.log(error, "error in postChangestatusController");
    }
  };
  return postStatusChangeController;
};
