import { z } from "zod";

export const budgetSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
  amount: z.number().positive("El monto debe ser positivo"),
});

export type BudgetBody = z.infer<typeof budgetSchema>;
export type UpdateBudgetBody = Partial<BudgetBody>;
