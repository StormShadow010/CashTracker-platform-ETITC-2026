import { Response } from "express";
import { z } from "zod";
import { AuthRequest } from "../../types/index";
import ExpenseService from "./expense.service";
import { ExpenseBody, UpdateExpenseBody } from "./expense.schema";

class ExpenseController {
  private service: ExpenseService;

  constructor(service: ExpenseService) {
    this.service = service;
  }

  private handleError(res: Response, error: unknown): void {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.issues });
      return;
    }
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Error en el servidor" });
  }

  getAll = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const expenses = await this.service.getAll(
        req.params.budgetId as string,
        req.user!.id,
      );
      res.json(expenses);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  create = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const expense = await this.service.create(
        req.params.budgetId as string,
        req.user!.id,
        req.body as ExpenseBody,
      );
      res.status(201).json(expense);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  update = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const expense = await this.service.update(
        req.params.id as string,
        req.params.budgetId as string,
        req.user!.id,
        req.body as UpdateExpenseBody,
      );
      res.json(expense);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      await this.service.delete(
        req.params.id as string,
        req.params.budgetId as string,
        req.user!.id,
      );
      res.json({ message: "Gasto eliminado" });
    } catch (error) {
      this.handleError(res, error);
    }
  };
}

export default ExpenseController;
