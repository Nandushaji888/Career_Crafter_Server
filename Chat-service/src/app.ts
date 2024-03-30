import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";

import dependencies from "./config/dependencies";
import { routes } from "./router"
import { userCreatedConsumer } from "./events/userCreatedConsumer";
import { recruiterCreatedConsumer } from "./events/recruiterCreatedConsumer";
import { app,server } from './socket/socket'
import connectDB from "./config/db";

dotenv.config();

// const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);





userCreatedConsumer(dependencies)
recruiterCreatedConsumer(dependencies)

app.use("/api", routes(dependencies));






export { app };
