import { Request, Response } from "express";
import { z } from "zod";
import AuthService from "./auth.service";

class AuthController {
  private service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.register(req.body); //req.body as RegisterBody
      res
        .status(201)
        .json({ message: "Usuario registrado exitosamente", ...result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.issues });
        return;
      }
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.login(req.body); //req.body as LoginBody
      res.json({ message: "Login exitoso", ...result });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.issues });
        return;
      }
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
}

export default AuthController;
