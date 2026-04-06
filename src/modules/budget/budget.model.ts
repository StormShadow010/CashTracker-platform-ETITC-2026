import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBudget extends Document {
  name: string;
  description?: string;
  amount: number;
  user: Types.ObjectId;
}

const BudgetSchema = new Schema<IBudget>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    amount: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IBudget>("Budget", BudgetSchema);
