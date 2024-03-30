import express from "express";
import {userController} from '../../lib/controller'
export default (dependencies: any) => {

    const router = express()
    const {applicationSendController,getApplicationController} = userController(dependencies)

    router.post('/create-application',applicationSendController)
    router.post('/get-application-status',getApplicationController)
    return router
};
