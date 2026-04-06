import { Router } from "express";
import BudgetRepository from "../budget/budget.repository";
import ExpenseRepository from "./expense.repository";
import ExpenseService from "./expense.service";
import ExpenseController from "./expense.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const budgetRepository = new BudgetRepository();
const expenseRepository = new ExpenseRepository();
const service = new ExpenseService(expenseRepository, budgetRepository);
const controller = new ExpenseController(service);

const router = Router({ mergeParams: true });

router.use(authMiddleware.handle.bind(authMiddleware));

router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
