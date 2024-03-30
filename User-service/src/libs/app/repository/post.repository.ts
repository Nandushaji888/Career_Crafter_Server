import { IPost } from "../../../utils/interface/interface";
import {Schema} from '../databse'
const {Post} = Schema
export default{
    storePost:async(data:IPost)=> {
        console.log('data');
        console.log(data);
        
        const postData={
            _id:data?._id||"",
            postName:data?.postName||"",
            company:data?.company||"",
            recruitingPlace:data?.recruitingPlace||"",
            createdAt:data?.createdAt||Date.now()||"",
            closingDate:data?.closingDate||Date.now()||"",
            employmentType:data?.employmentType||"",
            isPremium:data?.isPremium||false,
            isListed:data?.isListed||true,
            skills:data?.skills||"",
            qualification:data?.qualification||""


            // category:data?.category||"",
        }

        const response = await Post.create(postData)
        console.log(response);
        if (response) {
            return {status:true,message:'post created',response}
        }else{
            return {status:false,message:'error in creating post'}
        }
    },

    getAllPosts: async (
        page: number,
        limit: number,
        search: string,
        location: string,
        qualification: string,
        skills: string,
        workArrangementType: string,
        employmentType: string,
        userId:string
      ) => {
        try {
    
    
          page = Math.max(page, 1);
          const searchRegex = new RegExp(search, "i");
          const locationRegex = new RegExp(location, "i");
          const qualificationRegex = new RegExp(qualification, "i");
          const skillsRegex = new RegExp(skills, "i");
      
          const postDatas = await Post.find({
            $and: [
              { isListed: true },
              {
                $or: [
                  { postName: searchRegex },
                  { company: searchRegex },
                ],
              },
              { recruitingPlace: locationRegex },
              { qualification: qualificationRegex },
              { skills: skillsRegex },
              workArrangementType ? { workArrangementType } : {},
              employmentType ? { employmentType } : {},
            ],
          })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
      
          const totalJobs = await Post.countDocuments({
            $and: [
              {
                $or: [
                  { postName: searchRegex },
                  { company: searchRegex },
                  { recruitingPlace: searchRegex },
                ],
              },
              { qualification: qualificationRegex },
              { skills: skillsRegex },
              workArrangementType ? { workArrangementType } : {},
              employmentType ? { employmentType } : {},
              { isListed: true },
            ],
          });
      
          return {
            status: true,
            postDatas,
            page,
            totalPages: Math.ceil(totalJobs / limit),
          };
        } catch (error) {
          return {
            status: false,
            message: "Error in getting post datas: " , error,
          };
        }
      },

  
}