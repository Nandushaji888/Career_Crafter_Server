import { schema } from "../database";

const { Recruiter } = schema;

export default {
  getRecruitersList: async () => {
    try {
      const recruiters = await Recruiter.find({});
      if (recruiters) {
        return { status: true, recruiters };
      } else {
        return { status: false, message: "No recruiters available" };
      }
    } catch (error) {
      console.log("error in get recruiters list in repository", error);
      return { status: false, message: "Internal server error" };
    }
  },
  getRecruiterDetails: async (recruiterId: string) => {
    try {
      const recruiter = await Recruiter.findById(recruiterId);

      if (recruiter) {
        return { status: true, recruiter };
      } else {
        return { status: false, message: "recruiter not found" };
      }
    } catch (error) {
      console.log("error in get recruiter details in admin repository");
      return { status: false, message: "Internal server error" };
    }
  },
  changeRecruiterStatus: async (id: string, status: string) => {
    let state = true;
    if (status == "Active") state = false;

    try {
      const response = await Recruiter.findOneAndUpdate(
        { _id: id },
        { status: state }
      );
      console.log(response);

      const recruiters = await Recruiter.find({}).sort({ createdOn: -1 });
      if (response) {
        return {
          status: true,
          recruiters: recruiters,
          message: "recruiter status updated",
        };
      } else {
        return { status: false, message: "Error in changing recruiter status" };
      }
    } catch (err) {
      console.log("Error in changing recruiter status", err);
    }
  },
};
