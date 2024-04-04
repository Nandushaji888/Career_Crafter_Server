import { chatRepository, notificationRepository } from "../libs/app/repository";
import {
  send_message_usecase,
  get_messaged_users_usecase,
  createChatParticipantsUsecase,
  get_messages_usecase,
  change_message_status_usecase,
  create_notification_usecase,
  get_all_notifications_by_userId_usecase,
  change_read_status_usecase,
  notification_and_message_count_usecase,
  create_chat_conversation_usecase,
  find_message_usecase
} from "../libs/usecase";

const useCase: any = {
  send_message_usecase,
  get_messages_usecase,
  createChatParticipantsUsecase,
  get_messaged_users_usecase,
  change_message_status_usecase,
  create_notification_usecase,
  get_all_notifications_by_userId_usecase,
  change_read_status_usecase,
  notification_and_message_count_usecase,
  create_chat_conversation_usecase,
  find_message_usecase
};
const repository: any = {
  chatRepository: chatRepository,
  notificationRepository: notificationRepository,
};

export default {
  useCase,
  repository,
};
