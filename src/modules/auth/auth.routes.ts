import { Router } from "express";
import AuthRepository from "./auth.repository";
import AuthService from "./auth.service";
import AuthController from "./auth.controller";

const repository = new AuthRepository();
const service = new AuthService(repository);
const controller = new AuthController(service);

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);

export default router;
