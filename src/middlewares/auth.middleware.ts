import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, IUserPayload } from "../types/index.js";
import { env } from "../config/env.js";

class AuthMiddleware {
  handle(req: AuthRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Token no proporcionado" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, env.jwtSecret) as IUserPayload;
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: "Token inválido o expirado" });
    }
  }
}

export default new AuthMiddleware();
