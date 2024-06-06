import { PipelineStage } from 'mongoose';
import { User } from "../../libs/app/database/schema/user.schema";
import { getGeocode } from "../co-ordinates/getCordinates";
import { IUser } from "../interfaces/interfaces";

interface Coordinates {
  coordinates: [number, number];
  locationName: string;
}

export const getCoordinates = async (location: string, userId: string): Promise<Coordinates> => {
  let coordinates: [number, number] = [0, 0]; // default value
  let locationName: string = "Anywhere"; // default value

  if (location) {
    const geocodeResult = await getGeocode(location);
    if (geocodeResult && geocodeResult.coordinates) {
      coordinates = geocodeResult.coordinates as [number, number];
      locationName = location;
    }
  } else if (userId) {
    const user: IUser | null = await User.findById(userId);
    if (user && user.location) {
      coordinates = user.location.coordinates as [number, number];
      locationName = user.location.locationName;
    }
  }

  return { coordinates, locationName };
};



interface IQuery {
  isListed: boolean;
  $or: { postName?: RegExp; company?: RegExp }[];
  qualification: RegExp;
  skills: RegExp;
  workArrangementType?: string;
  employmentType?: string;
}

export const buildQuery = (
  search: string,
  qualification: string,
  skills: string,
  workArrangementType?: string,
  employmentType?: string
): IQuery => {
  const searchRegex = new RegExp(search, "i");
  const qualificationRegex = new RegExp(qualification, "i");
  const skillsRegex = new RegExp(skills, "i");

  let query: IQuery = {
    isListed: true,
    $or: [{ postName: searchRegex }, { company: searchRegex }],
    qualification: qualificationRegex,
    skills: skillsRegex,
  };

  if (workArrangementType) query.workArrangementType = workArrangementType;
  if (employmentType) query.employmentType = employmentType;

  return query;
};


export const buildPipeline = (
  query: IQuery,
  coordinates: [number, number],
  locationName: string,
  page: number,
  limit: number
): PipelineStage[] => {
  const limitNumber = Number(limit);

  
  return [
    {
      $geoNear: {
        near: coordinates ,
        distanceField: "distance",
        maxDistance: 10000,
        query: query,
        spherical: true,
      },
    },
    {
      $addFields: {
        isFromUserLocation: {
          $eq: ["$recruitingPlace.locationName", locationName],
        },
      },
    },
    {
      $sort: {
        isFromUserLocation: -1,
        distance: -1,
        createdAt: -1,
      },
    },
    {
      $skip: (page - 1) * limitNumber,
    },
    {
      $limit: limitNumber,
    },
  ];
};

interface Pagination {
  page: number;
  totalPages: number;
}

export const paginate = (totalItems: number, page: number, limit: number): Pagination => {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    page: page,
    totalPages: totalPages,
  };
};

