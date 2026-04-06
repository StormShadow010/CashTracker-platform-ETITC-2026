import { Response } from "express";
import { z } from "zod";
import { AuthRequest } from "../../types/index";
import BudgetService from "./budget.service";
import { BudgetBody, UpdateBudgetBody } from "./budget.schema";

class BudgetController {
  private service: BudgetService;

  constructor(service: BudgetService) {
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
      const budgets = await this.service.getAll(req.user!.id);
      res.json(budgets);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  getById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const budget = await this.service.getById(
        String(req.params.id),
        req.user!.id,
      );
      res.json(budget);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  create = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const budget = await this.service.create(
        req.user!.id,
        req.body as BudgetBody,
      );
      res.status(201).json(budget);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  update = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const budget = await this.service.update(
        String(req.params.id),
        req.user!.id,
        req.body as UpdateBudgetBody,
      );
      res.json(budget);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      await this.service.delete(String(req.params.id), req.user!.id);
      res.json({ message: "Presupuesto eliminado" });
    } catch (error) {
      this.handleError(res, error);
    }
  };
}

export default BudgetController;
