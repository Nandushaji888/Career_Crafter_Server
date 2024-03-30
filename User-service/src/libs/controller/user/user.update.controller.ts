import { Request, Response } from "express";
import { getGeocode } from "../../../utils/co-ordinates/getCordinates";

export default (dependencies: any) => {
  const {
    useCase: { updateUser_useCase },
  } = dependencies;

  const updateUserController = async (req: Request, res: Response) => {
    try {
      console.log(req.file);
      
      const {
        name,
        email,
        phone,
        aboutYou,
        dateOfBirth,
        qualification,
        skills,
        profilePic,
        location,
        secondarySkills,
        experience,
        file,
      } = req?.body;
      

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
        aboutYou: aboutYou,
        dateOfBirth: dateOfBirth,
        qualification: qualification,
        skills: skills,
        profilePic: profilePic,
        location: {
          locationName:location,
          type: "Point",
          coordinates: geocodedLocation,
        },
        experience: experience,
        secondarySkills: secondarySkills,
        resume: file,
      };
      // console.log("data");
      // console.log(data);

      const response = await updateUser_useCase(dependencies)(data);

      console.log(response);
      if (response.status) {
        return res.status(200).json({
          status: response?.status,
          user: response?.user,
          message: response?.message,
        });
      } else {
        return res
          .status(500)
          .json({ status: response?.status, message: response?.message });
      }
    } catch (error) {
      console.log("error in updateUser controller", error);
      return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  };
  return updateUserController;
};
