import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Salary from "@/models/Salary";
import Employee from "@/models/Employee";
import Department from "@/models/Department";
import { authenticate } from "@/lib/auth";

// GET → fetch all salaries (or by employee/department)
export async function GET(req: NextRequest) {
  await connectDB();
  const user = authenticate(req);
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("employee");
  const departmentId = searchParams.get("department");

  const query: any = {};
  if (employeeId) query.employee = employeeId;
  if (departmentId) query.department = departmentId;

  const salaries = await Salary.find(query)
    .populate("employee", "name department")
    .populate("department", "name")
    .sort({ createdAt: -1 });

  return NextResponse.json({ salaries });
}

// POST → add salary
export async function POST(req: NextRequest) {
  await connectDB();
  const user = authenticate(req);
  if (!user || user.role.toLowerCase() !== "admin")
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  const { employee, department, basicSalary, allowances, deductions, month } = await req.json();

  // optional: prevent duplicate salary for same employee/month
  const exists = await Salary.findOne({ employee, month });
  if (exists)
    return NextResponse.json({ message: "Salary already exists for this month" }, { status: 400 });

  const salary = await Salary.create({
    employee,
    department,
    basicSalary,
    allowances,
    deductions,
    month
  });

  return NextResponse.json({ message: "Salary added", salary });
}