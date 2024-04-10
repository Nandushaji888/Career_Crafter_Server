import { Dependencies } from "../../../../interfaces/dependency.interface";

export const admin_get_recruiter_details = (dependencies: Dependencies) => {
  const {
    repository: { adminRepository },
  } = dependencies;

  const executeFunction = async (recruiterId: string) => {
    try {
      const response = await adminRepository?.getRecruiterDetails(recruiterId);
      if (response?.status) {
        return { status: true, recruiter: response?.recruiter };
      } else {
        return { status: false, message: response?.message };
      }
    } catch (error) {
      console.log("error in admin get recruiter details", error);
      return { status: false, message: "Internal server error" };
    }
  };
  return { executeFunction };
};
