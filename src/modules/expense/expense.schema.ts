import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  amount: z.number().positive("El monto debe ser positivo"),
  category: z.string().optional(),
  date: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : new Date())),
});

export type ExpenseBody = z.infer<typeof expenseSchema>;
export type UpdateExpenseBody = Partial<ExpenseBody>;
