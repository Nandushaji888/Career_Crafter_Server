import userApplRouter from './applicationRoutes/user.routes'
import recruiterRouter from './applicationRoutes/recruiter.routes'


import express from "express"

export const routes = (dependencies:any)=> {
    const routes = express.Router()
    routes.use('/application/recruiter',recruiterRouter(dependencies))
    routes.use('/application',userApplRouter(dependencies))

    return routes
}