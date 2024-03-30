import send_message_controller from './send.message.controller'
import get_messages_controller from './get.messages.controller'
import get_messaged_users_controller from './get.messaged.users.controller'


export default (dependencies:any)=> {
return {
    sendMessageController : send_message_controller(dependencies),
    getMessagesController : get_messages_controller(dependencies),
    get_messaged_users_controller:get_messaged_users_controller(dependencies)


}
}