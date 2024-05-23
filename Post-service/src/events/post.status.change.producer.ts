import { RecordMetadata } from "kafkajs";
import { kafka } from "../config/kafkaClient";
import { Data } from "../libs/controller/admin/postStatusChangeController";

const producer = kafka.producer();

export const postStatusChangeProducer = async (
  kafkaData: Data,
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
    const result = await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(messagePayload) }],
    });

    result.forEach((recordMetadata: RecordMetadata) => {
      if (recordMetadata?.errorCode) {
        console.log("message production failed in applied job producer");
        throw new Error("message production failed in applied job producer");
      }
    });
    return result;
  } catch (error) {
    console.log("error in applied job producer", error);
  } finally {
    await producer.disconnect();
  }
};
