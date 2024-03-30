import {chatRepository} from '../libs/app/repository'
import {send_message_usecase,get_messaged_users_usecase,createChatParticipantsUsecase,get_messages_usecase,change_message_status_usecase} from '../libs/usecase'

const useCase: any = {
 send_message_usecase,
 get_messages_usecase,
 createChatParticipantsUsecase,
 get_messaged_users_usecase,
 change_message_status_usecase
    };
    const repository: any = {
      chatRepository:chatRepository
    };
    
    export default {
      useCase,
      repository,
    };