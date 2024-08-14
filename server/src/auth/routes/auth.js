import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";

export const authRoute = Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.post("/refresh", AuthController.refresh);
authRoute.post("/logout", (_req, res) => {
  res.clearCookie("auth_token").status(200).send({
    message: "Has cerrado sesión con éxito!",
  });
});
