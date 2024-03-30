import { kafka } from '../config/kafkaClient'
import { IRecruiter, IUser } from '../utils/interfaces/interface'

const producer = kafka.producer()

export const recruiterCreatedProducer = async(sendData:IRecruiter,topic:string, type:string)=> {
    try {
        if(!sendData){
            throw new Error("sendData not existed")
        }
        await producer.connect()
        const messagePayload = {
            type:type,
            data:sendData
        }
        
        const result:any = await producer.send({
            topic:topic,
            messages:[{value:JSON.stringify(messagePayload)}]
        })
        if (result && result[0] && result[0]?.error) {
            throw new Error("Message production failed");
          }

          return result
    } catch (error) {
        console.log("Error in the auth producer", error);
    } finally{
        await producer.disconnect()
    }
}