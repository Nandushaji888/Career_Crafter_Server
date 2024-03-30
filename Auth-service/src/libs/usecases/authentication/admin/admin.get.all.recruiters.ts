

export const admin_get_all_recruiters = (dependencies:any)=> {
    const {repository:{adminRepository}} = dependencies

    const executeFunction = async()=> {
       try {
        const response = await adminRepository.getRecruitersList()

        if(response?.status){
            return {status:true,recruiters:response?.recruiters}
        }else{
            return {status:response?.status,message:response?.message}
        }
    } catch (error) {
        console.log('error in admin get all recruiters',error);
        
           return {status:false,message:'Internal server error'}
        
       }
    }
    return {executeFunction}

}