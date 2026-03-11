"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import api from "@/lib/axios"
import { FaUserTie } from "react-icons/fa6"
import { format } from "date-fns"

export default function EmployeeProfilePage() {

  const [employee, setEmployee] = useState<any>(null)

  useEffect(() => {
    fetchEmployee()
  }, [])

  const fetchEmployee = async () => {
    try {
      const res = await api.get("/employees/69b1f0822ba0a33c934be91c") // replace with dynamic id
      setEmployee(res.data.employee)
    } catch (error) {
      console.log("Failed to fetch employee")
    }
  }

  if (!employee) return <p>Loading...</p>

  return (
    <div className="max-w-4xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Employee Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Profile Section */}
          <div className="flex justify-between items-start gap-6">

            {/* Info */}
            <div className="grid grid-cols-2 gap-6 w-full">

              <div>
                <Label>First Name</Label>
                <p className="text-sm mt-1">{employee.name.split(" ")[0]}</p>
              </div>

              <div>
                <Label>Last Name</Label>
                <p className="text-sm mt-1">{employee.name.split(" ")[1]}</p>
              </div>

              <div>
                <Label>Date of Birth</Label>
                <p className="text-sm mt-1">
                  {employee.dob ? format(new Date(employee.dob), "PPP") : "-"}
                </p>
              </div>

              <div>
                <Label>Employee ID</Label>
                <p className="text-sm mt-1">{employee.employeeId}</p>
              </div>

              <div>
                <Label>Gender</Label>
                <p className="text-sm mt-1">{employee.gender}</p>
              </div>

              <div>
                <Label>Marital Status</Label>
                <p className="text-sm mt-1">{employee.maritalStatus}</p>
              </div>

              <div>
                <Label>Email</Label>
                <p className="text-sm mt-1">{employee.email}</p>
              </div>
              
              <div>
                <Label>Designation</Label>
                <p className="text-sm mt-1">{employee.designation}</p>
              </div>
        </div>

            {/* Profile Image */}
            <div className="flex flex-col gap-4">
              <div className="min-w-42 h-52 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">

                {employee.profileImage ? (
                  <img
                    src={employee.profileImage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserTie className="text-6xl text-muted" />
                )}

              </div>
            </div>

          </div>

          {/* Job Info */}
          <div className="grid grid-cols-2 gap-6">



            <div>
              <Label>Department</Label>
              <p className="text-sm mt-1">{employee.department}</p>
            </div>

            <div>
              <Label>Salary</Label>
              <p className="text-sm mt-1">${employee.salary}</p>
            </div>

            <div>
              <Label>Role</Label>
              <p className="text-sm mt-1">{employee.role}</p>
            </div>

          </div>

        </CardContent>
      </Card>
    </div>
  )
}