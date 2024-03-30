import { WorkArrangementType, employmentType } from "../../../utils/interfaces/interfaces";

export const get_All_Posts_useCase=(dependencies:any)=> {
    const {repository:{postRepository}}=dependencies

    const executeFunction =async(page:number,limit:number,search:string,location:string,qualification:string,skills:string,workArrangementType:WorkArrangementType,employmentType:employmentType,userId:string)=> {

        
        
        const response = await postRepository?.listJobs(page,limit,search,location,qualification,skills,workArrangementType,employmentType,userId)
        // console.log(response);

        if(response.status){
            return {status:response?.status, postDatas:response?.postDatas,page:response?.page,totalPages:response?.totalPages}
        }else{
            return {status:response?.status,message:response?.message}
        }
        
    }
    return {executeFunction}
}