import bcrypt from 'bcrypt'

export const hashPassword = async(password:string) : Promise<string>=>{
   try {
    
    console.log('reached here');
    const salt = await bcrypt.genSalt(10);
    console.log('saltttt',salt);
    console.log(password);
    
    const hashedPass = await bcrypt.hash(password, salt);

    console.log(hashedPass);
    
    return hashedPass
   } catch (error) {
       console.log(error,'Error in hashing password');
    throw new Error('Error hashing password');
    
   }
};

export const comparePassword = async(password:string,hashedPass:string) : Promise<boolean>=> {

    try {
        let match= await bcrypt.compare(password,hashedPass)
        return match
    } catch (error) {
        console.log(error,'Error verifying password');
        throw new Error('Error verifying password');
    }
}



