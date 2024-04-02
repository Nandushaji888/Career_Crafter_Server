import express from 'express'
import chatRoutes from './chat.router'
import notificationRoutes from './notification.router'

export const routes = (dependencies:any)=> {
    const routes = express.Router()

    routes.use('/messages',chatRoutes(dependencies))
    routes.use('/notifications',notificationRoutes(dependencies))
    

  
    return routes
}