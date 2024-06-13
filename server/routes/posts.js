import express from "express";
import {
    deletePost,
    getFeedPosts,
    getUserPosts,
    likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import multer from "multer";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:id/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.delete("/:id/delete", verifyToken, deletePost);

export default router;