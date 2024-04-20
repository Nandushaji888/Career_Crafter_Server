import { kafka } from "../config/kafkaClient";
import { Dependencies } from "../interfaces/dependency.interface";
import { userStatusChangeController } from "../libs/controller/consumeController/useStatusChangeController";

const consumer = kafka.consumer({
  groupId: "auth-service-user-status-change",
});

export const userStatusChangeConsumer = async (dependencies: Dependencies) => {
  console.log("in user status change consumer");
  await consumer.connect();
  await consumer.subscribe({ topic: "statusTopic", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const bynerydata: Buffer = message.value as Buffer;
      const jsonstring: string = bynerydata?.toString();
      const jsondata = JSON.parse(jsonstring);
      const messagetype = jsondata?.type;

      if (messagetype === "changeUserStatus") {
        await userStatusChangeController(dependencies, jsondata.data);
      }
    },
  });
};
