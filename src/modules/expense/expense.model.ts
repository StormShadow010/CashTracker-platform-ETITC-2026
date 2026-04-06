import mongoose, { Schema, Document, Types } from "mongoose";

export interface IExpense extends Document {
  name: string;
  amount: number;
  category?: string;
  date?: Date;
  budget: Types.ObjectId;
  user: Types.ObjectId;
}

const ExpenseSchema = new Schema<IExpense>(
  {
    name: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    category: { type: String, trim: true },
    date: { type: Date, default: Date.now },
    budget: { type: Schema.Types.ObjectId, ref: "Budget", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IExpense>("Expense", ExpenseSchema);
