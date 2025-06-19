import express from "express";
import * as authenticationController from "./authentication.controller.js";

const router = express.Router();

router.post("/signin", authenticationController.signin);

export default router;