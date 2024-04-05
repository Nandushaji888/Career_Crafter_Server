import send_message_controller from './send.message.controller'
import get_messages_controller from './get.messages.controller'
import get_messaged_users_controller from './get.messaged.users.controller'
import create_chat_conversation_controller from './create.chat.conversation.controller'
import conversation_message_count_controller from './converstation.message.count.controller'
import clear_message_count_controller from './clear.message.count.controller'


export default (dependencies:any)=> {
return {
    sendMessageController : send_message_controller(dependencies),
    getMessagesController : get_messages_controller(dependencies),
    get_messaged_users_controller:get_messaged_users_controller(dependencies),
    create_chat_conversation_controller:create_chat_conversation_controller(dependencies),
    conversation_message_count_controller:conversation_message_count_controller(dependencies),
    clear_message_count_controller:clear_message_count_controller(dependencies)


}
}