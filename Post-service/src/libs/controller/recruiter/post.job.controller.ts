
import { Response, Request } from "express";
import { postProducer } from "../../../events/postProducer";
import { getGeocode } from "../../../utils/co-ordinates/getCordinates";

export default (dependencies: any) => {
  const {
    useCase: { createPost_useCase },
  } = dependencies;

  const createUserController = async (req: Request, res: Response) => {

    // console.log(req.body);

    const geocodedLocation = await getGeocode(req?.body?.formData?.location);
    if (!geocodedLocation) {
      return res
        .status(400)
        .json({ status: false, message: "Failed to geocode address" });
    }   
    const recruitingPlace = 
      {
        locationName:req?.body?.formData?.location,
        type: "Point",
        coordinates: geocodedLocation,
      } 
    const data = {...req.body.formData,recruitingPlace}
    const response = await createPost_useCase(dependencies).executeFunction(data);
    
    if (response?.status) {
      // console.log(response?.user);
      const postData = response?.postData
     await postProducer(postData,'postTopic','createPost')
       return res.status(201).json({status:response?.status,message:response?.message})

    } else {
        res.status(400).json({ status: false, message: response?.message });

    }
  };
  return createUserController;
};
