import { Router } from "express";
import BudgetRepository from "./budget.repository";
import BudgetService from "./budget.service";
import BudgetController from "./budget.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const repository = new BudgetRepository();
const service = new BudgetService(repository);
const controller = new BudgetController(service);

const router = Router();

router.use(authMiddleware.handle.bind(authMiddleware));

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
