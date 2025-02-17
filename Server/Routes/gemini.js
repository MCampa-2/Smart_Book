import express from "express";
import { geminiResponse } from "../Controllers/gemini.js";
const router = express.Router();

router.post("/generate",geminiResponse);

export default router;