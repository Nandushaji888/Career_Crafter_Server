import {kafka} from '../config/kafkaClient'
import { createUserController } from '../libs/controller/consume/create.user.controller' 
import { Dependencies } from '../utils/interfaces/dependency.interface'

const consumer=kafka.consumer({
    groupId:"auth-post-service"
})

export const userConsumer = async(dependencies:Dependencies)=>{
    try {        
        await consumer.connect()
        await consumer.subscribe({topic:"authTopic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const bynerydata: Buffer = message.value as Buffer
                const jsonstring: string = bynerydata?.toString();
                const jsondata=JSON.parse(jsonstring)
                const messagetype=jsondata?.type
                if(messagetype === 'createUser'){                    
                    await createUserController(dependencies,jsondata.data)
                }
            }
        })
        
    } catch (error) {
        console.log('Error in auth consumer',error);
        
    }
}