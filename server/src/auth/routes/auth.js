import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { relative } from "node:path";
import { Router } from "express";
import { v4 } from "uuid";
import { db } from "../../api/database/turso.js";
import { __dirname } from "../../root.js";
import { validateUser } from "../schema/schema.js";
dotenv.config();

export const authRoute = Router();

authRoute.post("/register", async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).send({
      message: "Las contraseñas no coinciden!",
    });
  }

  const avatar = req.file;
  const avatarPath = relative(__dirname, avatar.path);

  const result = validateUser({
    username: username,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
    avatar: avatarPath,
  });

  if (!result.success) {
    return res.status(400).send({
      message: result.error.errors,
    });
  }

  const id = v4();
  const passwordHash = bcrypt.hashSync(password, 10);

  db.execute({
    sql: "insert into users (id, username, email, password, avatar) values (?, ?, ?, ?, ?)",
    args: [id, username, email, passwordHash, avatarPath],
  });

  const token = jwt.sign(
    {
      id: id,
      username: username,
      email: email,
      password: password,
      avatar:
        avatarPath &&
        `https://seas-becoming-perry-speech.trycloudflare.com/${avatarPath}`,
    },
    process.env.JWT_SECRET
  );

  return res
    .cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    })
    .status(201)
    .send({
      message: "Te has registrado con éxito!",
      data: {
        id: id,
        username,
        email,
        avatar:
          avatarPath &&
          `https://seas-becoming-perry-speech.trycloudflare.com/${avatarPath}`,
      },
      token: token,
    });
});

authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email);

  const { rows: user } = await db.execute({
    sql: "select * from users where email = ?",
    args: [email],
  });

  if (user.length === 0) {
    return res.status(400).send({
      message: "Usuario no encontrado!",
    });
  }

  const result = await bcrypt.compare(password, user[0].password);

  if (result) {
    const token = jwt.sign(
      {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
        password: password,
        avatar:
          user[0].avatar &&
          `https://seas-becoming-perry-speech.trycloudflare.com/${user[0].avatar}`,
      },
      process.env.JWT_SECRET
    );

    return res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .status(200)
      .send({
        message: "Has iniciado sesión con éxito!",
        data: {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          avatar:
            user[0].avatar &&
            `https://seas-becoming-perry-speech.trycloudflare.com/${user[0].avatar}`,
        },
        token: token,
      });
  }

  return res.status(400).send({
    message: "Contraseña incorrecta!",
  });
});

authRoute.post("/logout", (_req, res) => {
  res.clearCookie("auth_token").status(200).send({
    message: "Has cerrado sesión con éxito!",
  });
});

authRoute.post("/refresh", async (req, res) => {
  const token = req.cookies.auth_token;
  const { token: storageToken } = req.body;

  if (!token && !storageToken) {
    return res.status(400).send({
      message: "Falta el token!",
    });
  }

  if (token) {
    const { id, password } = jwt.verify(token, process.env.JWT_SECRET);

    const { rows: user } = await db.execute({
      sql: "select * from users where id = ?",
      args: [id],
    });

    const result = await bcrypt.compare(password, user[0].password);

    if (result) {
      const newToken = jwt.sign(
        {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          password: password,
          avatar:
            user[0].avatar &&
            `https://seas-becoming-perry-speech.trycloudflare.com/${user[0].avatar}`,
        },
        process.env.JWT_SECRET
      );

      return res
        .cookie("auth_token", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })
        .status(200)
        .send({
          message: "Has iniciado sesión con éxito!",
          data: {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            avatar:
              user[0].avatar &&
              `https://seas-becoming-perry-speech.trycloudflare.com/${user[0].avatar}`,
          },
          token: newToken,
        });
    }
  }
  if (storageToken) {
    const { id, password } = jwt.verify(storageToken, process.env.JWT_SECRET);

    const { rows: user } = await db.execute({
      sql: "select * from users where id = ?",
      args: [id],
    });

    const result = await bcrypt.compare(password, user[0].password);

    if (result) {
      const newToken = jwt.sign(
        {
          id: user[0].id,
          username: user[0].username,
          email: user[0].email,
          password: password,
          avatar:
            user[0].avatar &&
            `https://seas-becoming-perry-speech.trycloudflare.com/${user[0].avatar}`,
        },
        process.env.JWT_SECRET
      );

      return res
        .cookie("auth_token", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })
        .status(200)
        .send({
          message: "Has iniciado sesión con éxito!",
          data: {
            id: user[0].id,
            username: user[0].username,
            email: user[0].email,
            avatar:
              user[0].avatar &&
              `https://seas-becoming-perry-speech.trycloudflare.com/${user[0].avatar}`,
          },
          token: newToken,
        });
    }
  }
  return res.status(400).send({
    message: "Token no válido!",
  });
});
