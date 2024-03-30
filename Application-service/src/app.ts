import express from "express";
import cors from "cors";
import { routes } from "./router";
import dependencies from "./config/dependencies";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use("/api",routes(dependencies))
export {app}
