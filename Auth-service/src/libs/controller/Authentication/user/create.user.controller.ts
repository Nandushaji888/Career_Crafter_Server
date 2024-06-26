import { Response, Request, NextFunction } from "express";
import { getGeocode } from "../../../../utils/co-ordinated/getCordinates";
import { Dependencies } from "../../../../interfaces/dependency.interface";

export default (dependencies: Dependencies) => {
  const {
    useCase: { addUser_useCases },
  } = dependencies;
  

  const createUserController = async (req: Request, res: Response ,next:NextFunction) => {
   try {
    const { name, email, phone, password,location } = req.body.values;
    const geocodedLocation = await getGeocode(location);
    if (!geocodedLocation) {
      return res
        .status(400)
        .json({ status: false, message: "Failed to geocode address" });
    }

    const data = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      location: {
        locationName:location,
        type: "Point",
        coordinates: geocodedLocation,
      },
    };
    // console.log("data", data);

    const response = await addUser_useCases(dependencies)?.executeFunction(data);
    // console.log(response);

    if (response?.status) {
      const{data ,otp }= response
      req.session.userData = data
      req.session.Otp = otp
      res.json({
        status: response?.status,
      });
    } else {
      console.log(response.message);

      res.json({ status: false, message: response?.message });
    }
   } catch (error) {
    console.log('error in createUserController',error);
    next(error)
    
   }
  };
  return createUserController;
};
