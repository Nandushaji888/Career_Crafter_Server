import {kafka} from '../config/kafkaClient'
import {userStatusChangeController} from '../libs/controller/consumeController/useStatusChangeController'

const consumer = kafka.consumer({
    groupId:'auth-service-user-status-change'
})

export const userStatusChangeConsumer = async(dependencies:any)=> {
    console.log('in user status change consumer');
    await consumer.connect()
    await consumer.subscribe({topic:'statusTopic',fromBeginning:true})
    await consumer.run({
        eachMessage:async({message})=> {
            const bynerydata:any=message.value
            const jsonstring:string=bynerydata?.toString()
            const jsondata=JSON.parse(jsonstring)
            const messagetype=jsondata?.type

            if(messagetype =='changeUserStatus'){
                // console.log('consumer',jsondata);
                await userStatusChangeController(dependencies,jsondata.data)
                
            }
        }
    })
    
}
