import express from 'express';
import {updatePost,createPost,deletePost,getAllPosts,getPost } from '../controller/posts.js';
const router = express.Router();

//updatePost
router.put("/:id",updatePost)

//deletePost
router.delete("/:id",deletePost)

//createPost
router.post("/",createPost)

//getpost
router.get("/:id",getPost)

//getAllpOst

router.get("/",getAllPosts)

export default router