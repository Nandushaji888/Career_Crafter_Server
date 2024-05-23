import express from "express";
import cors from "cors";
import dependencies from "./config/dependencies";
import { routes } from "./router";
import { userConsumer } from "./events/storeAuthUserData";
import cookieParser  from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

userConsumer(dependencies);

app.use("/api", routes(dependencies));

export { app };
