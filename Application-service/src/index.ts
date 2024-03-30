import { app } from "./app";
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db'

const start = async()=> {
    try {
        await connectDB()
    } catch (error) {
        console.log('error in connecting the application server');

    }
}

const port = process.env.PORT || 5004

app.listen(port,()=> {
    console.log(`server started at ${port}` );

})

start()