import authenticationRouter from './Authentication/auhentication.router'
import recruiterAuthenticationRouter from './Authentication/recruiter.authentication.router'
import adminAuthenticationRouter from './Authentication/admin.authentication.router'

import express from 'express'

export const routes = (dependencies:any)=> {
    const routes = express.Router()

    routes.use('/auth/user',authenticationRouter(dependencies))
    routes.use('/auth/recruiter',recruiterAuthenticationRouter(dependencies))
    routes.use('/auth/admin',adminAuthenticationRouter(dependencies))
    return routes
}