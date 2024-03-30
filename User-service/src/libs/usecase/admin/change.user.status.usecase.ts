
export const change_userStatus_useCase = (dependencies : any)=> {
    const {repository:{userRepository}} = dependencies
    const executeFunction = async(userId:string,status:boolean)=> {
       try {
        const res = await userRepository?.changeStatus(userId,status)
        if(res?.status){
            // console.log('in usecase');
            // console.log(res?.user);
            
            return {status:res?.status,users:res?.users,message:res?.message}
        }else{
            return {status:res?.status,message:res?.message}
        }
       } catch (error) {
        console.log('error in change user status usecase',error);
        
        return {status:false,message:'Internal server error'}

       }
    }
    return {executeFunction}
}

