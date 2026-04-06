import Expense, { IExpense } from "./expense.model";

class ExpenseRepository {
  async findAllByBudget(budgetId: string) {
    return Expense.find({ budget: budgetId });
  }

  async findByIdAndBudget(id: string, budgetId: string) {
    return Expense.findOne({ _id: id, budget: budgetId });
  }

  async create(
    data: Pick<IExpense, "name" | "amount" | "category" | "date"> & {
      budget: string;
      user: string;
    },
  ) {
    return Expense.create(data);
  }

  async updateByIdAndBudget(
    id: string,
    budgetId: string,
    data: Partial<Pick<IExpense, "name" | "amount" | "category" | "date">>,
  ) {
    return Expense.findOneAndUpdate({ _id: id, budget: budgetId }, data, {
      new: true,
    });
  }

  async deleteByIdAndBudget(id: string, budgetId: string) {
    return Expense.findOneAndDelete({ _id: id, budget: budgetId });
  }
}

export default ExpenseRepository;
