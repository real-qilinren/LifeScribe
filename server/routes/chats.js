import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {createChat, deleteChat, getChats} from "../controllers/chats.js";

const router = express.Router();

/* READ */
router.get("/:id/chats", verifyToken, getChats);

/* UPDATE */
router.post("/chat", verifyToken, createChat);
router.delete("/:id/delete", verifyToken, deleteChat);

export default router;