import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


import dependencies from './config/dependencies'
import {routes} from './router'
import { userConsumer } from "./events/authConsumer";
import { postConsumer } from "./events/postConsumer";
import { addAppliedJobConsumer } from "./events/appliedJobConsumer";


dotenv.config()


const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())


app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use("/files",express.static("files"))

userConsumer(dependencies)
postConsumer(dependencies)
addAppliedJobConsumer(dependencies)
app.use("/api", routes(dependencies));

export { app };
