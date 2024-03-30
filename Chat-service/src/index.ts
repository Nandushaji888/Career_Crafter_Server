import { app } from './app'
import connectDB from './config/db'
import dotenv from "dotenv";
import { server } from './socket/socket';
dotenv.config();

const start = async()=> {
    try {
        await connectDB()
    } catch (error) {
        console.log('error in connecting the server');
    }
}

const port =   4005


app.listen(port,()=>{
    console.log(`post-server started at ${port} `);
})

server.listen(4006,()=>{
    console.log(`post-server started at 4006`);
  })

start()
