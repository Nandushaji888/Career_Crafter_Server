import { kafka} from '../config/kafkaClient'
import { createChatParticipantsController } from '../libs/controller/consumeController/createChatParticipantsController'

const consumer=kafka.consumer({
    groupId:"userCreated-service"
})

export const userCreatedConsumer = async(dependencies:any)=>{
    try {
        
        await consumer.connect()
        await consumer.subscribe({topic:"authTopic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const bynerydata:any=message.value
                const jsonstring:string=bynerydata?.toString()
                const jsondata=JSON.parse(jsonstring)
                const messagetype=jsondata?.type
                if(messagetype == 'createUser'){
                    // console.log('consumer',jsondata);
                    
                    // await createUserController(dependencies,jsondata.data)
                    await createChatParticipantsController(dependencies,jsondata.data)
                }
            }
        })
        
    } catch (error) {
        console.log('Error in auth consumer',error);
        
    }
}