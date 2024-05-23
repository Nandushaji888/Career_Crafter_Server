import { getGeocode } from "../../../utils/co-ordinates/getCordinates";
import {
  WorkArrangementType,
  employmentType,
} from "../../../utils/interfaces/enum";
import { IPost, IQuery, IUser } from "../../../utils/interfaces/interfaces";
import { schema } from "../database";
const { Post, User } = schema;

export default {
  storeUser: async (data: IUser) => {
    console.log("data");
    console.log(data);

    const userData = {
      _id: data?._id || "",
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      location: data?.location || "",
      isGoogle: data?.isGoogle ? true : false,
      type: data?.type || "",
      status: data?.status || "",
      aboutYou: data?.aboutYou || "",
      dateOfBirth: data?.dateOfBirth || "",
      appliedJobs: data?.appliedJobs || [],
      savedJobs: data?.savedJobs || [],
      createdOn: data?.createdOn || Date.now(),
      editedOn: Date.now(),
      resume: data?.resume || "",
      qualification: data?.qualification || "",
      skills: data?.skills || "",
      profilePic: data?.profilePic || "User-Profile-PNG-Download-Image.png",
    };

    const response = await User.create(userData);
    console.log(response);

    if (response) {
      return { status: true, message: "user created", response };
    } else {
      return { status: false, message: "error in creating user" };
    }
  },

  createPost: async (data: IPost) => {
    try {
      const postData = {
        postName: data?.postName,
        company: data?.company,
        responsibilities: data?.responsibilities,
        jobDescription: data?.jobDescription,
        skills: data?.skills,
        qualification: data?.qualification,
        salary: data?.salary,
        category: data?.category,
        questions: data?.questions,
        recruiterEmail: data?.recruiterEmail,
        recruitingPlace: data?.recruitingPlace,
        closingDate: data?.closingDate,
        workArrangementType: data?.workArrangementType,
        employmentType: data.employmentType,
        isPremium: data.isPremium,
        isListed: data.isListed,
        recruiterId: data?.recruiterId,
        isRejected: data?.isRejected,
      };

      let response = await Post.create(postData);
      if (response) {
        return { status: true, message: "post created", response };
      } else {
        return { status: false, message: "error in creating post" };
      }
    } catch (error) {
      console.log("error in post.repository create post", error);
      return { status: false, message: "error in creating post" };
    }
  },
  findJobPost: async (id: string) => {
    try {
      const jobDetails = await Post.findById(id);
      if (jobDetails) {
        return { status: true, jobDetails };
      } else {
        return { status: false, message: "Error in fetching the job details" };
      }
    } catch (error) {
      console.log("error in finding job in post service", error);
      return { status: false, message: "Error in fetching the job details" };
    }
  },
  pendingPost: async () => {
    try {
      const posts = await Post.find({
        $and: [{ isListed: false, isRejected: false }],
      });
      if (posts) {
        return { status: true, posts };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log("error in finding pending post", error);
      return { status: false };
    }
  },
  getAllPostsAdmin: async () => {
    try {
      const posts = await Post.find({});
      if (posts) {
        return { status: true, posts };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log("error in allPost repository", error);

      return { status: false };
    }
  },
  changeStatus: async (id: string, status: string, rejectedReason: string) => {
    try {
      let state;
      if (status === "List") {
        state = true;
        const response = await Post.updateOne(
          { _id: id },
          { $set: { isListed: state, isRejected: false, rejectedReason: null } }
        );

        if (response) {
          const postData = await Post.findById(id);
          return { status: true, postData, message: "Job post has accepted" };
        } else {
          return { status: false, message: "Error in changing status" };
        }
      } else {
        const response = await Post.updateOne(
          { _id: id },
          { $set: { isRejected: true, rejectedReason: rejectedReason } }
        );
        if (response) {
          const postData = await Post.findById(id);

          return { status: true, postData, message: "Job has been rejected" };
        } else {
          return { status: false, message: "Error in deleting job data" };
        }
      }
    } catch (err) {
      console.log("Error in changing job status", err);
      return {
        status: false,
        message: "Error occurred while changing job status",
      };
    }
  },

  listJobs: async (
    page: number,
    limit: number,
    search: string,
    location: string,
    qualification: string,
    skills: string,
    workArrangementType: WorkArrangementType,
    employmentType: employmentType,
    userId: string
  ) => {
    try {
      let coordinates;
      let locationName;
      console.log("location");
      // console.log(location);

      if (location) {
        const geocodeResult = await getGeocode(location);
        coordinates = geocodeResult.coordinates;
        locationName = location;
      } else {
        if (userId) {
          const user = await User.findById(userId);
          if (user && user.location) {
            coordinates = user.location.coordinates;
            locationName = user.location.locationName;
          }
        }
      }

      if (!coordinates || !location) {
        coordinates = [0, 0];
        locationName = "Anywhere";
      }

      page = Math.max(page, 1);
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

      // Aggregation pipeline
      const limitNumber = Number(limit);

      const pipeline = [
        {
          $geoNear: {
            near: coordinates,
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

      const postDatas = await Post.aggregate(pipeline as any[]);

      const totalJobs = await Post.countDocuments(query);

      return {
        status: true,
        postDatas,
        page,
        totalPages: Math.ceil(totalJobs / limit),
      };
    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: "Error in getting post datas: ",
        error,
      };
    }
  },

  recruiterListJobs: async (id: string) => {
    try {
      const response = await Post.find({ recruiterId: id }).sort({
        createdAt: -1,
      });
      if (response) {
        return { status: true, jobList: response };
      } else {
        return { status: false, message: "Unable to List Jobs at the moment" };
      }
    } catch (error) {
      console.log("error in recruiterList Jobs in post repository", error);
      return { status: false, message: "Unable to List Jobs at the moment" };
    }
  },
};
