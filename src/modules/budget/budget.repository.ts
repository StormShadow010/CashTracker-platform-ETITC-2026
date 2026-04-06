import Budget, { IBudget } from "./budget.model";

class BudgetRepository {
  async findAllByUser(userId: string) {
    return Budget.find({ user: userId });
  }

  async findByIdAndUser(id: string, userId: string) {
    return Budget.findOne({ _id: id, user: userId });
  }

  async create(
    data: Pick<IBudget, "name" | "description" | "amount"> & { user: string },
  ) {
    return Budget.create(data);
  }

  async updateByIdAndUser(
    id: string,
    userId: string,
    data: Partial<Pick<IBudget, "name" | "description" | "amount">>,
  ) {
    return Budget.findOneAndUpdate({ _id: id, user: userId }, data, {
      new: true,
    });
  }

  async deleteByIdAndUser(id: string, userId: string) {
    return Budget.findOneAndDelete({ _id: id, user: userId });
  }
}

export default BudgetRepository;
