import {kafka} from '../config/kafkaClient'
import { IPost } from '../utils/interfaces/interfaces'

const producer = kafka.producer()

export const postProducer = async(sendData:IPost,topic:string,type:string)=>{
    try {
        if(!sendData){
            throw new Error("sendData not existed")

        }
        await producer.connect()
        const messagePayload = {
            type:type,
            data:sendData
        }
        console.log(sendData);

        const result:any= await producer.send({
            topic:topic,
            messages:[{value:JSON.stringify(messagePayload)}]
        })
        if (result && result[0] && result[0]?.error) {
            throw new Error("Message production failed");
          }
        return result
    } catch (error) {
        console.log("Error in the post producer", error);

    }finally{
        await producer.disconnect()
    }
}