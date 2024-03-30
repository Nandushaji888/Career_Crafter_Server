import {kafka} from '../config/kafkaClient'
import { createPostController } from '../libs/controller/consumeControllers/create.post.controller';

const consumer = kafka.consumer({
    groupId:"post-service"
})

export const postConsumer =async(dependencies:any)=> {

    await consumer.connect()
    await consumer.subscribe({topic:'postTopic',fromBeginning:true})
    await consumer.run({
        eachMessage:async({message})=> {
            const bynerydata:any=message.value
            const jsonstring:string=bynerydata?.toString()
            const jsondata=JSON.parse(jsonstring)
            const messagetype=jsondata?.type

            if(messagetype =='createPost'){
                // console.log('consumer',jsondata);
                console.log('before controller create post');
                
                await createPostController(dependencies,jsondata.data)
                
            }
        }
    })
}