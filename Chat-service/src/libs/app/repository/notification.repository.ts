import { schema } from "../database";
import { Conversation } from "../database/schema/conversation.schema";
import { Message } from "../database/schema/message.schema";
const { Notification } = schema;

export default {
  createNotification: async (data: any) => {
    try {

        console.log('data');
        console.log(data);
        
      const notificationData = {
        userId: data?.userId,
        message: data?.content,
        jobPostId: data?.jobPostId,
        applicationId: data?._id,
        applicationStatus: data?.status,
        postStatus: data?.postStatus,
        rejectedReason:data?.rejectedReason
      };
      const response = await Notification.create(notificationData);

      if (response) {
        return { status: true, message: "ChatParticipants created", response };
      } else {
        return { status: false, message: "error in creating ChatParticipants" };
      }
    } catch (error) {
      console.log(
        "error in create notification in notification repository",
        error
      );
      return { status: false, message: "Internal server error" };
    }
  },
  getNotificationsById: async (userId: string) => {
    try {
      const notifications = await Notification.find({ userId: userId }).sort({
        createdAt: -1,
      });
      // console.log(userId);
      // console.log(notifications);

      if (notifications) {
        return { status: true, notifications };
      } else {
        return { status: false, message: "No notification for you" };
      }
    } catch (error) {
      console.log("error in notifications by id in repository", error);
      return { status: false, message: "Internal server error" };
    }
  },
  readStatusChange: async (notificationIds: string[]) => {
    try {

      const response = await Notification.updateMany(
        { _id: { $in: notificationIds } },
        { readStatus: true }
      );
      if (response) {
        return { status: true };
      } else {
        return { status: false, message: "Nothing is there to mark" };
      }
    } catch (error) {
      console.log("error in readStatusChange  in repository", error);
      return { status: false, message: "Internal server error" };
    }
  },
  notificationAndMessageCount: async (userId: string) => {
    try {
        console.log(userId);
        
      const notificationCount = await Notification.countDocuments({
        userId: userId,
        readStatus: false,
      });

      const conversations = await Conversation.find({
        participants: userId,
      }).populate("messages");

      const messageCount = await Message.countDocuments({
        receiverId: userId,
        readStatus: false,
      });

      
      

      return { status: true, notificationCount, messageCount };
    } catch (error) {
      console.log("error in notificationAndMessageCount  in repository", error);
      return { status: false, message: "Internal server error" };
    }
  },
};
