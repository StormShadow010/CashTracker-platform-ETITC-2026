import BudgetRepository from "./budget.repository";
import { budgetSchema, BudgetBody, UpdateBudgetBody } from "./budget.schema";

class BudgetService {
  private repository: BudgetRepository;

  constructor(repository: BudgetRepository) {
    this.repository = repository;
  }

  async getAll(userId: string) {
    return this.repository.findAllByUser(userId);
  }

  async getById(id: string, userId: string) {
    const budget = await this.repository.findByIdAndUser(id, userId);
    if (!budget) throw new Error("Presupuesto no encontrado");
    return budget;
  }

  async create(userId: string, body: BudgetBody) {
    const data = budgetSchema.parse(body);
    return this.repository.create({ ...data, user: userId });
  }

  async update(id: string, userId: string, body: UpdateBudgetBody) {
    const data = budgetSchema.partial().parse(body);
    const budget = await this.repository.updateByIdAndUser(id, userId, data);
    if (!budget) throw new Error("Presupuesto no encontrado");
    return budget;
  }

  async delete(id: string, userId: string) {
    const budget = await this.repository.deleteByIdAndUser(id, userId);
    if (!budget) throw new Error("Presupuesto no encontrado");
    return budget;
  }
}

export default BudgetService;
