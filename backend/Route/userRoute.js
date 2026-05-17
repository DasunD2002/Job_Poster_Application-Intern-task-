import express from "express";
import { createUser, userLogin } from "../Controller/userController.js";

const route = express.Router();

route.post("/login", userLogin);
route.post("/registration", createUser);

export default route;

