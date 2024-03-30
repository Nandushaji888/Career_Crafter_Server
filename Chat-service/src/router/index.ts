import express from 'express'
import chatRoutes from './chat.router'

export const routes = (dependencies:any)=> {
    const routes = express.Router()

    routes.use('/messages',chatRoutes(dependencies))

  
    return routes
}