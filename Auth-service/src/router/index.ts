import authenticationRouter from "./Authentication/auhentication.router";
import recruiterAuthenticationRouter from "./Authentication/recruiter.authentication.router";
import adminAuthenticationRouter from "./Authentication/admin.authentication.router";

import express from "express";
import { Dependencies } from "../interfaces/dependency.interface";

export const routes = (dependencies: Dependencies) => {
  const routes = express.Router();

  routes.use("/auth/user", authenticationRouter(dependencies));
  routes.use("/auth/recruiter", recruiterAuthenticationRouter(dependencies));
  routes.use("/auth/admin", adminAuthenticationRouter(dependencies));
  return routes;
};
