import application_send_controller from './application.send.conroller'
import getApplicationController from './get.application.controller'

export default(dependencies:any)=> {
    return {
        applicationSendController :application_send_controller(dependencies),
        getApplicationController:getApplicationController(dependencies),

    }
} 