import {kafka} from '../config/kafkaClient'
import { addAppliedJobController } from '../libs/controller/consumeControllers/add.appliedJob.controller'

const consumer=kafka.consumer({
    groupId:"applied-job"
})

export const addAppliedJobConsumer = async(dependencies:any)=>{
    try {
        // console.log('reached userConsumer');
        
        await consumer.connect()
        await consumer.subscribe({topic:"addAppliedJodTopic",fromBeginning:true})
        await consumer.run({
            eachMessage:async({message})=>{
                const bynerydata:any=message.value
                const jsonstring:string=bynerydata?.toString()
                const jsondata=JSON.parse(jsonstring)
                const messagetype=jsondata?.type
                if(messagetype == 'appliedJob'){
                    // console.log('consumer',jsondata);
                    
                    await addAppliedJobController(dependencies,jsondata.data)
                }
            }
        })
        
    } catch (error) {
        console.log('Error in auth consumer',error);
        
    }
}