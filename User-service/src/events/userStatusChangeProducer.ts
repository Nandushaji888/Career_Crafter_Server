import { kafka } from "../config/kafkaClient";

const producer = kafka.producer();
interface statusData{
    id:string,
    status:string
}

export const userStatusChangeProducer = async (
  statusdata: statusData,
  topic: string,
  type: string
) => {
  try {
    console.log('hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    
    if (!statusdata?.id) {
      console.log("id is not available");
      throw new Error("id is not available");
    }
    await producer.connect();

    const messagePayload = {
      type: type,
      data: statusdata,
    };
    const result: any = await producer.send({
      topic: topic,
      messages: [{ value: JSON.stringify(messagePayload) }],
    });

    if (result && result[0] && result[0]?.error) {
      console.log("message production falied in userstatus change producer");

      throw new Error(
        "message production falied in userstatus change producer"
      );
    }
  } catch (error) {
    console.log("error in userStatuschange producer", error);
  } finally {
    await producer.disconnect();
  }
};
