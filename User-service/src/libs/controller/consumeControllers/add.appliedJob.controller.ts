


   export const addAppliedJobController=async(dependencies:any,data:any)=> {
        const {consumeUsecase:{addAppliedJob_usecase}} = dependencies
        const {userId,jobPostId} = data
        const response = await addAppliedJob_usecase(dependencies).executeFunction(userId,jobPostId)
    }
