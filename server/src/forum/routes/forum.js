import { Router } from "express";
import { ForumController } from "../controller/ForumController.js";

export const forumRoutes = Router();

forumRoutes.post("/post/create", ForumController.newPost);
forumRoutes.post("/comment/v1/create", ForumController.newComment);
forumRoutes.post("/comment/v2/create", ForumController.newCommentInComment);
forumRoutes.get("/posts", ForumController.getAllPosts);
