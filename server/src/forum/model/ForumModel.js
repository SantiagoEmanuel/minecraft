import { db } from "../../api/database/turso.js";

export class ForumModel {
  static async savePost({ userId, postContent, title }) {
    try {
      return await db
        .execute({
          sql: "INSERT INTO posts (content, user_id, title) VALUES (?,?,?);",
          args: [postContent, userId, title],
        })
        .then((result) => {
          if (result.rowsAffected) {
            return {
              success: true,
              status: 200,
              message: "Publicación creada con éxito",
            };
          }
          return {
            success: false,
            status: 500,
            message: "Error al guardar la publicación en la base de datos",
          };
        });
    } catch (error) {
      return {
        success: false,
        status: 500,
        message: "Error al guardar la publicación en la base de datos",
      };
    }
  }

  static async saveComment({ comment, postId, userId }) {
    try {
      return await db
        .execute({
          sql: "INSERT INTO comments (comment, post_id, user_id) VALUES (?, ?, ?);",
          args: [comment, postId, userId],
        })
        .then(({ rowsAffected }) => {
          if (rowsAffected == 0) {
            return {
              success: false,
              status: 400,
              message: "No se pudo realizar el comentario con éxito",
            };
          }

          return {
            success: true,
            status: 201,
            message: "El comentario se realizo con éxito",
          };
        });
    } catch (error) {
      return {
        success: false,
        status: 400,
        message: "No se pudo realizar el comentario con éxito",
      };
    }
  }

  static async saveCommentInComment({ comment, commentId, userId }) {
    return {
      success: false,
      status: 400,
      message: "No se pudo realizar el comentario con éxito",
    };
  }

  static async getAllPosts() {
    try {
      return await db
        .execute(
          "SELECT posts.id, posts.content, posts.title, users.username, users.avatar FROM posts INNER JOIN users on posts.user_id = users.id;"
        )
        .then(({ rows }) => {
          if (rows.length === 0)
            return {
              success: false,
              status: 204,
              message: "No se encontraron publicaciones",
            };

          return {
            success: true,
            status: 200,
            message: "Se han encontrado resultados",
            data: rows,
          };
        });
    } catch (error) {
      return {
        success: false,
        status: 400,
        message: "Error en la base de datos",
      };
    }
  }
}
