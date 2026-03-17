import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  month: { type: String, required: true }, // "2026-03"
  status: {
    type: String,
    enum: ["paid", "pending"],
    default: "pending"
  }
}, { timestamps: true });

export default mongoose.models.Salary || mongoose.model("Salary", salarySchema);