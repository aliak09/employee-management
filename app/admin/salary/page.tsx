"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import api from "@/lib/axios";
import DataTable from "@/components/table/DataTable";

export default function SalaryPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [salaries, setSalaries] = useState<any[]>([]);

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [allowances, setAllowances] = useState("");
  const [deductions, setDeductions] = useState("");
  const [month, setMonth] = useState("");

  const columns = [
  {
    header: "Employee",
    accessor: "employee",
    cell: (row: any) => row.employee?.name || "—",
  },
  {
    header: "Department",
    accessor: "department",
    cell: (row: any) => row.department?.name || "—",
  },
  {
    header: "Basic",
    accessor: "basicSalary",
  },
  {
    header: "Allowances",
    accessor: "allowances",
  },
  {
    header: "Deductions",
    accessor: "deductions",
  },
  {
    header: "Month",
    accessor: "month",
  },
  {
    header: "Status",
    accessor: "status",
  },
];

  useEffect(() => {
    // fetch departments
    const fetchDepartments = async () => {
      try {
        const res = await api.get("/department");
        setDepartments(res.data.departments);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    // fetch employees for selected department
    if (!selectedDepartment) return;
    const fetchEmployees = async () => {
      try {
        const res = await api.get(`/employees?department=${selectedDepartment}`);
        setEmployees(res.data.employees);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEmployees();
  }, [selectedDepartment]);

  const fetchSalaries = async () => {
    try {
      const res = await api.get("/salary");
      setSalaries(res.data.salaries);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const handleAddSalary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !basicSalary || !month) return toast.error("Fill all required fields");

    try {
      await api.post("/salary", {
        employee: selectedEmployee,
        department: selectedDepartment,
        basicSalary: Number(basicSalary),
        allowances: Number(allowances || 0),
        deductions: Number(deductions || 0),
        month
      });
      toast.success("Salary added!");
      setBasicSalary(""); setAllowances(""); setDeductions(""); setMonth(""); setSelectedEmployee("");
      fetchSalaries();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add salary");
      console.error(err);
    }
  };

  return (
  <>
    <Card className="max-w-3xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Manage Salaries</CardTitle>
      </CardHeader>

      <form onSubmit={handleAddSalary}>
        <CardContent className="space-y-4">
          <div>
            <Label>Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dep => (
                  <SelectItem key={dep._id} value={dep._id}>{dep.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Employee</Label>
            <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {employees.map(emp => (
                  <SelectItem key={emp._id} value={emp._id}>{emp.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Basic Salary</Label>
            <Input type="number" value={basicSalary} onChange={e => setBasicSalary(e.target.value)} />
          </div>

          <div>
            <Label>Allowances</Label>
            <Input type="number" value={allowances} onChange={e => setAllowances(e.target.value)} />
          </div>

          <div>
            <Label>Deductions</Label>
            <Input type="number" value={deductions} onChange={e => setDeductions(e.target.value)} />
          </div>

          <div>
            <Label>Month</Label>
            <Input type="month" value={month} onChange={e => setMonth(e.target.value)} />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button type="submit">Add Salary</Button>
        </CardFooter>
      </form>

    </Card>
    <Card className="p-0">
      {/* Recent salaries */}
      <div className="mt-6">

        <h3 className="font-semibold mb-2">Recent Salaries</h3>

        <DataTable columns={columns} data={salaries} />
    
      </div>
    </Card>
  </>
  );
}