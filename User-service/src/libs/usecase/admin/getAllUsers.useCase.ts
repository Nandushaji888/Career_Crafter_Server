
export const get_all_users_usecase =(dependencies:any)=> {
    const {repository:{userRepository}} = dependencies

    const executeFunction = async()=> {
        const res = await userRepository?.getAllUsers()

        if(res.status){
            return {status:res?.status,users:res?.users}
        }else{
            return {status:res?.status,message:res?.message}

        }
    }
    return {executeFunction}
}   