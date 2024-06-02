import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {getChatMessages, sendMessage} from "../controllers/messages.js";

const router = express.Router();

/* READ */
router.get("/:chatId", verifyToken, getChatMessages);

/* UPDATE */
router.post("/message", verifyToken, sendMessage);

export default router;