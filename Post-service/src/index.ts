import {app} from './app'
import connectDB from './config/db'
import dotenv from "dotenv";
dotenv.config();

const start = async()=> {
    try {
        await connectDB()
    } catch (error) {
        console.log('error in connecting the server');
        
    }
}

const port =  process.env.PORT || 4001

app.listen(port,()=>{
    console.log(`post-server started at ${port} `);
    
})

start()
