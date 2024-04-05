import { ObjectId } from "mongoose";
import { IUser } from "../../../utils/interface/interface";
import { Schema } from "../databse";

const { User } = Schema;

export default {
  userEmailExist: async (email: string) => {
    try {
      const response = await User.findOne({ email: email });
      return response;
    } catch (error) {
      console.log("error in authentication.repository userEmailExist", error);
    }
  },
  userPhoneExist: async (phone: string) => {
    try {
      const response = await User.findOne({ phone: phone });
      return response;
    } catch (error) {
      console.log("error in authentication.repository userEmailExist", error);
    }
  },
  storeUser: async (data: IUser) => {
    console.log("data");
    console.log(data);

    const userData = {
      _id: data?._id || "",
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      location:data?.location || "",
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
    // console.log('userData');
    // console.log(userData);

    const response = await User.create(userData);
    console.log(response);

    if (response) {
      return { status: true, message: "user created", response };
    } else {
      return { status: false, message: "error in creating user" };
    }
  },

  updateUser: async (data: IUser) => {
    // console.log('data');
    // console.log(data);

    const response = await User.updateOne(
      { email: data?.email },
      { $set: { ...data } }
    );
    // console.log(response);

    if (response) {
      const user = await User.findOne({ email: data?.email });
      return { status: true, user: user, message: "user updated " };
    } else {
      return { status: false, message: "error in updating user" };
    }
  },
  findUser: async (id: string) => {
    console.log('id');
    console.log(id);

    const user = await User.findById(id);
    console.log('user');
    console.log(user);

    if (user) {
      return { status: true, user };
    } else {
      return { status: false, message: "Error in getting user data" };
    }
  },
  getAllUsers: async () => {
    const users = await User.find({}).sort({ createdOn: -1 });
    if (users) {
      return { status: true, users };
    } else {
      return { status: false, message: "Error in fetching all users" };
    }
  },
  changeStatus: async (id: string, status: string) => {
    let state = true;
    if (status == "Active") state = false;

    try {
      const response = await User.findOneAndUpdate(
        { _id: id },
        { status: state }
      );
      console.log(response);

      const users = await User.find({}).sort({ createdOn: -1 });
      if (response) {
        return { status: true, users: users, message: "User status updated" };
      } else {
        return { status: false, message: "Error in changing user status" };
      }
    } catch (err) {
      console.log("Error in changing user status", err);
    }
  },
  addAppliedJobId: async (jobPostId: string, userId: string) => {
    try {
      const response = await User.findByIdAndUpdate(
        userId,
        { $push: { appliedJobs: jobPostId } },
        { new: true }
      );
  
      
      if (response) {
        return { status: true };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log("Error in changing user status", error);
    }
  },
  saveJobPost: async (jobPostId: ObjectId, userId: string) => {
    try {
      const user = await User.findById(userId);

      if (user?.savedJobs.includes(jobPostId)) {
        return { status: false, message: "Job already saved" };
      }
      const response = await User.findByIdAndUpdate(
        userId,
        { $push: { savedJobs: jobPostId } },
        { new: true }
      );
      if (response) {
        return { status: true, user };
      } else {
        return { status: false, message: "Error in saving job post" };
      }
    } catch (error) {
      console.log("Error in changing user status", error);
      return { status: false, message: "Error in saving job post" };
    }
  },

  appliedJobList: async (userId: string) => {
    try {
      const user = await User.findById(userId)
      .populate({path:"appliedJobs",
      options:{sort:{createdOn:1}}
    })
    // .sort({createdAt:1})
      console.log('response in reposritory');
      console.log(user);
      
      if (user) {
        if (user?.appliedJobs.length === 0) {
          return { status: true, message: "No applied jobs found" };
        }
        return { status: true, appliedJobList: user?.appliedJobs };
      } else {
        console.log("error in getting applied job list");
        return { status: false, message: "Error in getting applied job list" };
      }
    } catch (error) {
      console.log("error in getting applied job list");
      return { status: false, message: "Internal server error" };
    }
  },
  
  savedJobList: async (userId: string) => {
    try {

      
      const user = await User.findById(userId).populate("savedJobs");  
      console.log(user);
      console.log('user in applied job list');
      
      if (user) {
        if (user?.savedJobs.length === 0) {
          return { status: true, message: "No saved jobs found" };
        }
        return { status: true, savedJobList: user?.savedJobs };
      } else {
        console.log("error in getting saved job list");
        return { status: false, message: "Error in getting saved job list" };
      }
    } catch (error) {
      console.log("error in getting saved job list");
      return { status: false, message: "Internal server error" };
    }
  },
};
