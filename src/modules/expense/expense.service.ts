import BudgetRepository from "../budget/budget.repository";
import ExpenseRepository from "./expense.repository";
import {
  expenseSchema,
  ExpenseBody,
  UpdateExpenseBody,
} from "./expense.schema";

class ExpenseService {
  private expenseRepository: ExpenseRepository;
  private budgetRepository: BudgetRepository;

  constructor(
    expenseRepository: ExpenseRepository,
    budgetRepository: BudgetRepository,
  ) {
    this.expenseRepository = expenseRepository;
    this.budgetRepository = budgetRepository;
  }

  private async verifyBudgetOwnership(budgetId: string, userId: string) {
    const budget = await this.budgetRepository.findByIdAndUser(
      budgetId,
      userId,
    );
    if (!budget) throw new Error("Presupuesto no encontrado");
    return budget;
  }

  async getAll(budgetId: string, userId: string) {
    await this.verifyBudgetOwnership(budgetId, userId);
    return this.expenseRepository.findAllByBudget(budgetId);
  }

  async create(budgetId: string, userId: string, body: ExpenseBody) {
    await this.verifyBudgetOwnership(budgetId, userId);
    const data = expenseSchema.parse(body);
    return this.expenseRepository.create({
      ...data,
      budget: budgetId,
      user: userId,
    });
  }

  async update(
    id: string,
    budgetId: string,
    userId: string,
    body: UpdateExpenseBody,
  ) {
    await this.verifyBudgetOwnership(budgetId, userId);
    const data = expenseSchema.partial().parse(body);
    const expense = await this.expenseRepository.updateByIdAndBudget(
      id,
      budgetId,
      data,
    );
    if (!expense) throw new Error("Gasto no encontrado");
    return expense;
  }

  async delete(id: string, budgetId: string, userId: string) {
    await this.verifyBudgetOwnership(budgetId, userId);
    const expense = await this.expenseRepository.deleteByIdAndBudget(
      id,
      budgetId,
    );
    if (!expense) throw new Error("Gasto no encontrado");
    return expense;
  }
}

export default ExpenseService;
