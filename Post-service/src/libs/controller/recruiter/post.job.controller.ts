import { Response, Request } from "express";
import { postProducer } from "../../../events/postProducer";
import { getGeocode } from "../../../utils/co-ordinates/getCordinates";
import { Dependencies } from "../../../utils/interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { createPost_useCase },
  } = dependencies;

  const createUserController = async (req: Request, res: Response) => {
    try {
      const geocodedLocation = await getGeocode(req?.body?.formData?.location);
      if (!geocodedLocation) {
        return res
          .status(400)
          .json({ status: false, message: "Failed to geocode address" });
      }
      const recruitingPlace = {
        locationName: req?.body?.formData?.location,
        type: "Point",
        coordinates: geocodedLocation,
      };
      const data = { ...req.body.formData, recruitingPlace };
      const response = await createPost_useCase(dependencies).executeFunction(
        data
      );

      if (response?.status) {
        const postData = response?.postData;
        await postProducer(postData, "postTopic", "createPost");
        return res
          .status(201)
          .json({ status: response?.status, message: response?.message });
      } else {
        res.status(400).json({ status: false, message: response?.message });
      }
    } catch (error) {
      console.log("Error in createUserController", error);
      res.status(500).json({ status: false, message: "Internal server error" });
    }
  };
  return createUserController;
};
