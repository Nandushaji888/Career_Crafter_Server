import {app} from './app'
import connectDB from './config/db'

const start = async()=> {
    try {
        await connectDB()
    } catch (error) {
        console.log('error in connecting the server');
        
    }
}

app.listen(4002,()=>{
    console.log('server started at 4002');
    
})

start()
