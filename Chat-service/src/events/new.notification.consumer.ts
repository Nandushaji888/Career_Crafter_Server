import { kafka} from '../config/kafkaClient'
import {createNotificationController} from '../libs/controller/consumeController/new.notification.controller'

const consumer=kafka.consumer({
    groupId:"new_notification-service"
})

export const notificatinCreatedConsumer = async(dependencies:any)=>{
    try {
        
        await consumer.connect()
        await consumer.subscribe({topic:"notificationTopic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const bynerydata:any=message.value
                const jsonstring:string=bynerydata?.toString()
                const jsondata=JSON.parse(jsonstring)
                const messagetype=jsondata?.type
                if(messagetype == 'newNotification'){
                    // console.log('consumer',jsondata);
                    
                    await createNotificationController (dependencies,jsondata.data)
                }
            }
        })
        
    } catch (error) {
        console.log('Error in auth consumer',error);
        
    }
}