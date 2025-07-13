import express from "express";
import cors from "cors";
const app=express();
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

import { api_router } from "./route.js";
app.use('',api_router);
app.use((req, res, next) => {
  res.status(404).send("404 server not found");
});
export {
    app
}