import { relative } from "node:path";
import { validateUser } from "../schema/schema.js";
import { __dirname } from "../../root.js";
import { AuthModel } from "../model/AuthModel.js";

export class AuthController {
  static register(req, res) {
    const { username, email, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      return res.status(400).send({
        message: "¡Las contraseñas no coinciden!",
      });
    }

    let avatar = req.file;
    if (avatar) {
      avatar = relative(__dirname, avatar.path);
    } else {
      avatar = "";
    }

    const validation = validateUser({
      username,
      email,
      password,
      passwordConfirm,
      avatar,
    });
    if (!validation.success) {
      return res.status(400).send({
        message: validation.error.message,
      });
    }

    const result = AuthModel.createAccount({
      avatar,
      username,
      email,
      password,
    });

    if (!result.success) {
      return res.status(result.status).send({
        message: result.message,
      });
    }

    return res
      .cookie("auth_token", result.data.token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_DEV === "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .status(result.status)
      .send({
        message: "¡Usuario registrado con éxito!",
        data: {
          id: result.data.id,
          username: result.data.username,
          email: result.data.email,
          avatar: result.data.avatar,
        },
        token: result.data.token,
      });
  }
  static async login(req, res) {
    const { email, password } = req.body;

    const result = await AuthModel.getAccount({ email, password });

    if (!result.success) {
      return res.status(result.status).send({
        message: result.message,
      });
    }

    return res
      .cookie("auth_token", result.data.token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_DEV === "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .status(result.status)
      .send({
        message: result.message,
        data: {
          id: result.data.id,
          username: result.data.username,
          email: result.data.email,
          avatar: result.data.avatar,
        },
        token: result.data.token,
      });
  }
  static refresh(req, res) {
    const cookieToken = req.cookie.auth_token;
    const storageToken = req.body;

    const result = AuthModel.getDataToken({
      cookieToken,
      storageToken,
    });

    if (!result.success) {
      return res.status(result.status).send({
        message: result.message,
      });
    }

    return res
      .cookie("auth_token", result.data.token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_DEV === "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .status(result.status)
      .send({
        message: result.message,
        data: {
          id: result.data.id,
          avatar: result.data.avatar,
          username: result.data.username,
          email: result.data.email,
        },
        token: result.data.token,
      });
  }
}
