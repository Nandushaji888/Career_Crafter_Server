
export const get_userData_useCase = (dependencies: any) => {
  const {
    repository: { userRepository },
  } = dependencies;

  const executeFunction=async(id:string)=> {
    const response = await userRepository?.findUser(id)
    // console.log('response');
    // console.log(response);
    
    if(response?.status){
        return {status:response?.status,user:response.user}
    }else{
        return {status:response?.status,message:response?.message}

    }
  }
  return {executeFunction}
};
