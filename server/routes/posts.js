import express from "express";
import multer from "multer";
import { createPost, generateDescription, deletePost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

/* CREATE */
router.post("/", verifyToken, upload.single("picture"), createPost);

/* GENERATE DESCRIPTION */
router.post("/generate-description", verifyToken, upload.single("picture"), generateDescription);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:id/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

/* DELETE */
router.delete("/:id/delete", verifyToken, deletePost);

export default router;
