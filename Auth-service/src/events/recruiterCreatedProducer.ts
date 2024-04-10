import { RecordMetadata } from "kafkajs";
import { kafka } from "../config/kafkaClient";
import { IRecruiter } from "../interfaces/interface";

const producer = kafka.producer();

export const recruiterCreatedProducer = async (
  sendData: IRecruiter,
  topic: string,
  type: string
) => {
  try {
    if (!sendData) {
      throw new Error("sendData not existed");
    }
    await producer.connect();
    const messagePayload = {
      type: type,
      data: sendData,
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
    console.log("Error in the auth producer", error);
  } finally {
    await producer.disconnect();
  }
};
