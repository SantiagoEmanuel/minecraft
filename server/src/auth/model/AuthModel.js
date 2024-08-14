import bcrypt from "bcrypt";
import { db } from "../../api/database/turso.js";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export class AuthModel {
  static createAccount({ avatar, username, email, password }) {
    const id = v4();
    const passwordHashed = bcrypt.hashSync(password, 10);

    try {
      db.execute({
        sql: "INSERT INTO users (id, avatar, username, email, password) VALUES (?, ?, ?, ?, ?);",
        args: [id, avatar, username, email, passwordHashed],
      });
    } catch (err) {
      return {
        status: 409,
        success: false,
        message: "¡El usuario ya existe!",
      };
    }

    const token = jwt.sign(
      {
        id,
        username,
        email,
        avatar,
      },
      process.env.JWT_SECRET
    );

    return {
      status: 201,
      success: true,
      message: "¡Usuario creado con éxito!",
      data: {
        id,
        avatar: avatar
          ? `https://minecraft-nnsl.onrender.com/${avatar}`
          : avatar,
        username,
        email,
        token,
      },
    };
  }
  static async getAccount({ email, password }) {
    try {
      return await db
        .execute({
          sql: "SELECT * FROM users where email = ?",
          args: [email],
        })
        .then(({ rows }) => {
          if (rows.length === 0) {
            return {
              status: 404,
              success: false,
              message: "¡Usuario no encontrado!",
            };
          }

          if (bcrypt.compareSync(password, rows[0].password)) {
            const token = jwt.sign(
              {
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email,
                avatar: rows[0].avatar
                  ? `http://localhost:8080/${rows[0].avatar}`
                  : rows[0],
              },
              process.env.JWT_SECRET
            );

            return {
              status: 200,
              success: true,
              message: "¡Has iniciado sesión!",
              data: {
                id: rows[0].id,
                avatar: rows[0].avatar
                  ? `https://minecraft-nnsl.onrender.com/${avatar}`
                  : rows[0].avatar,
                username: rows[0].username,
                email,
                token,
              },
            };
          }

          return {
            status: 404,
            success: false,
            message: "¡Contraseña incorrecta!",
          };
        });
    } catch (error) {
      console.log(error);
      return {
        status: 400,
        success: false,
        message: "¡Credenciales invalidas!",
      };
    }
  }
  static getDataToken({ cookieToken, storageToken }) {
    if (cookieToken || storageToken) {
      try {
        const { id, avatar, username, email } = jwt.verify(
          cookieToken || storageToken,
          process.env.JWT_SECRET
        );

        const newToken = jwt.sign(
          {
            id,
            avatar,
            username,
            email,
          },
          process.env.JWT_SECRET
        );

        return {
          status: 200,
          success: true,
          message: "¡Has iniciado sesión!",
          data: {
            id,
            avatar: avatar
              ? `https://minecraft-nnsl.onrender.com/${avatar}`
              : avatar,
            username,
            email,
            token: newToken,
          },
        };
      } catch (error) {
        return {
          status: 498,
          success: false,
          message: "¡Token invalido/expirado!",
        };
      }
    } else {
      return {
        status: 400,
        success: false,
        message: "¡No hay ningún token!",
      };
    }
  }
}
