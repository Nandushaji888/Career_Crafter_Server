import adminPostRouter from './post.routes/admin.post.router'
import recruiterPostRouter from './post.routes/recruiter.post.router'
import userPostRoutes from './post.routes/user.post.router'

import express from 'express'

export const routes = (dependencies:any)=> {
    const routes = express.Router()

    // routes.use('/post')
    routes.use('/post/admin',adminPostRouter(dependencies))
    routes.use('/post/recruiter',recruiterPostRouter(dependencies))
    routes.use('/post',userPostRoutes(dependencies))
  
    return routes
}