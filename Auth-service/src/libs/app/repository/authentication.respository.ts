import { IRecruiter, IUser, statusData } from "../../../interfaces/interface";
import { schema } from "../database";
const { User, Recruiter, Admin } = schema;

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

  createUser: async (data: IUser) => {
    const userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      isGoogle: data.isGoogle ? true : false,
      location: data?.location,
    };
    const response = await User.create(userData);
    if (response) {
      return { status: true, message: "user created", response };
    } else {
      return { status: false, message: "error in creating user" };
    }
  },
  findUser: async (email: string) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        if (user.status) {
          return { status: true, user: user };
        } else {
          return {
            status: false,
            message:
              "User is blocked by admin contact admin@gmail.com for further enquiry",
          };
        }
      } else {
        return { status: false, message: "Email or Password is incorrect" };
      }
    } catch (error) {
      console.log(error, "Error while finding a user");
    }
  },
  createRecruiter: async (data: IRecruiter) => {
    const recruiterData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      worksAt: data.worksAt,
      password: data.password,
    };
    const response = await Recruiter.create(recruiterData);
    if (response) {
      return { status: true, message: "recruiter created", response };
    } else {
      return { status: false, message: "error in creating recruiter" };
    }
  },
  findRecruiter: async (email: string) => {
    try {
      const recruiter = await Recruiter.findOne({ email: email });
      if (recruiter) {
        return { status: true, recruiter: recruiter };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error, "Error while finding a recruiter");
    }
  },
  recruiterEmailExist: async (email: string) => {
    try {
      const response = await Recruiter.findOne({ email: email });
      return response;
    } catch (error) {
      console.log(
        "error in authentication.repository recruiterEmailExist",
        error
      );
    }
  },
  recruiterPhoneExist: async (phone: string) => {
    try {
      const response = await Recruiter.findOne({ phone: phone });
      return response;
    } catch (error) {
      console.log(
        "error in authentication.repository recruiterEmailExist",
        error
      );
    }
  },
  findAdmin: async (email: string) => {
    try {
      const admin = await Admin.findOne({ email: email });
      console.log(admin);

      if (admin) {
        return { status: true, admin: admin };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error, "Error while finding a admin");
    }
  },
  setNewPassword: async (email: string, password: string) => {
    try {
      const response = await User.updateOne(
        { email: email },
        { password: password }
      );
      if (response) {
        return { status: true };
      } else {
        return { status: false, message: "Error in updating password" };
      }
    } catch (error) {
      console.log(error, "error in setting new password");
    }
  },
  isGoogleTrue: async (email: string) => {
    try {
      const response = await User.updateOne(
        { email: email },
        { isGoogle: true }
      );
      if (response) {
        return { status: true };
      } else {
        return { status: false, message: "Error in signin with google" };
      }
    } catch (error) {
      console.log(error, "error in isGoogleTrue");
    }
  },
  changeStatus: async (data: statusData) => {
    const { id, status } = data;

    let state = true;
    if (status == "Active") state = false;

    try {
      const response = await User.findOneAndUpdate(
        { _id: id },
        { status: state }
      );
      console.log(response);
      if (response) {
        return { status: true, user: response, message: "User status updated" };
      } else {
        return { status: false, message: "Error in changing user status" };
      }
    } catch (err) {
      console.log("Error in changing user status", err);
    }
  },
  findUserById: async (userId: string) => {
    try {
      const user = await User.findOne({ _id: userId }).select("-password");
      if (user) {
        if (user.status) {
          return { status: true, user: user };
        } else {
          return {
            status: false,
            message:
              "User is blocked by admin contact admin@gmail.com for further enquiry",
          };
        }
      } else {
        return { status: false, message: "Email or Password is incorrect" };
      }
    } catch (error) {
      console.log(error, "Error while finding a user");
    }
  },
};
