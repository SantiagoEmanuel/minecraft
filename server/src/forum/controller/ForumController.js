import { ForumModel } from "../model/ForumModel.js";

export class ForumController {
  static async newPost(req, res) {
    const { content, userId } = req.body;
    const date = new Date().toISOString().split("T")[0];

    // Validate data after

    const result = await ForumModel.savePost({
      postContent: content,
      userId: userId,
      date: date,
    });

    return res.status(result.status).send({
      message: result.message,
    });
  }

  static async newComment(req, res) {
    const { postId, comment, userId } = req.body;

    const result = await ForumModel.saveComment({
      comment,
      postId,
      userId,
    });

    return res.status(result.status).send({
      message: result.message,
    });
  }

  static async newCommentInComment(req, res) {
    const { comment, commentId, userId } = req.body;

    const result = await ForumModel.saveCommentInComment({
      comment,
      commentId,
      userId,
    });

    return res.status(result.status).send({
      message: result.message,
    });
  }

  static async getAllPosts(req, res) {
    const result = await ForumModel.getAllPosts();

    if (!result.success) {
      return res.status(result.status).send({
        message: result.message,
      });
    }

    return res.status(result.status).send({
      message: result.message,
      data: result.data,
    });
  }
}
