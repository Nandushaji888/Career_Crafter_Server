import { kafka } from "../config/KafkaClient";

const producer = kafka.producer();
interface kafkaData{
    userId:string;
    jobPostId:string
}

export const addAppliedJobProducer = async (
    kafkaData: kafkaData,
  topic: string,
  type: string
) => {
  try {
    
    if (!kafkaData) {
      console.log("id is not available");
      throw new Error("id is not available");
    }
    await producer.connect();

    const messagePayload = {
      type: type,
      data: kafkaData,
    };
    const result: any = await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(messagePayload) }],
    });

    if (result && result[0] && result[0]?.error) {
      console.log("message production falied in applied job producer");

      throw new Error(
        "message production falied in applied job producer"
      );
    }
  } catch (error) {
    console.log("error in applied job producer", error);
  } finally {
    await producer.disconnect();
  }
};
