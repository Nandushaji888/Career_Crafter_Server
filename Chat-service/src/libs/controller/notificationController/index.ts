import get_all_notifications_by_userId_controller  from './get.all.notifications.by.userId.controller'
import change_read_status_controller from './change.read.status.controller'
import notification_and_message_count_controller from './notification.and.message.count.controller'


export default (dependencies:any)=> {
    return {
      
        get_all_notifications_by_userId_controller:get_all_notifications_by_userId_controller(dependencies),
        change_read_status_controller:change_read_status_controller(dependencies),
        notification_and_message_count_controller:notification_and_message_count_controller(dependencies)

    }
    }