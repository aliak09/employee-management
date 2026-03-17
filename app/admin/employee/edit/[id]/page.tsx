"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

import {
Select,
SelectContent,
SelectItem,
SelectTrigger,
SelectValue
} from "@/components/ui/select"

import {
Popover,
PopoverContent,
PopoverTrigger
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

import { cn } from "@/lib/utils"
import { FaUserTie } from "react-icons/fa6"

import api from "@/lib/axios"

export default function EditEmployeePage() {

const { id } = useParams()

const [dob, setDob] = useState<Date | undefined>();
const [imgPreview, setImagePreview] = useState<string | null>(null);

const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [email,setEmail] = useState("");
const [employeeId,setEmployeeId] = useState("");
const [gender,setGender] = useState("");
const [maritalStatus,setMaritalStatus] = useState("");
const [designation,setDesignation] = useState("");
const [department,setDepartment] = useState("");
const [salary,setSalary] = useState("");
const [role,setRole] = useState("");
const [departments, setDepartments] = useState<any[]>([]);


useEffect(()=>{
    const fetchDepartments = async()=>{
      try{
      const res = await api.get("/department");
      setDepartments(res.data.departments);
      }catch(error){
        console.error("Failed to fetch departments", error);
      }
    };

    fetchDepartments();
  },[])

/* ---------------- FETCH EMPLOYEE ---------------- */

useEffect(()=>{
fetchEmployee()
},[])

const fetchEmployee = async () => {
try{

const res = await api.get(`/employees/${id}`)
const emp = res.data.employee

const nameParts = emp.name.split(" ")

setFirstName(nameParts[0] || "")
setLastName(nameParts[1] || "")

setEmail(emp.email || "")
setEmployeeId(emp.employeeId || "")
setGender(emp.gender || "")
setMaritalStatus(emp.maritalStatus || "")
setDesignation(emp.designation || "")
setDepartment(emp.department?._id || "")
setSalary(emp.salary?.toString() || "")
setRole(emp.role || "")

setDob(emp.dob ? new Date(emp.dob) : undefined)

setImagePreview(emp.profileImage)

}catch(err){
console.log("Failed to fetch employee")
}
}

/* ---------------- UPDATE EMPLOYEE ---------------- */

const handleUpdate = async () => {

try{

await api.put(`/employees/${id}`,{

name: `${firstName} ${lastName}`,
email,
employeeId,
gender,
maritalStatus,
designation,
department,
salary:Number(salary),
role,
dob: dob ? dob.toISOString() : null,
profileImage: imgPreview

})

alert("Employee updated successfully")

}catch(error:any){

alert(error.response?.data?.message)

}

}

/* ---------------- IMAGE PREVIEW ---------------- */

const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {

const file = e.target.files?.[0]

if(file){

const previewUrl = URL.createObjectURL(file)

setImagePreview(previewUrl)

}

}

/* ---------------- UI ---------------- */

return (

<div className="max-w-4xl mx-auto py-6">

<Card>

<CardHeader>
<CardTitle>Edit Employee</CardTitle>
</CardHeader>

<CardContent className="space-y-6">

<div className="flex justify-between items-start gap-4">

<div className="grid grid-cols-2 gap-6 w-full">

{/* FIRST NAME */}

<div>

<Label>First Name</Label>

<Input
value={firstName}
onChange={(e)=>setFirstName(e.target.value)}
/>

</div>

{/* LAST NAME */}

<div>

<Label>Last Name</Label>

<Input
value={lastName}
onChange={(e)=>setLastName(e.target.value)}
/>

</div>

{/* DOB */}

<div>

<Label>Date of Birth</Label>

<Popover>

<PopoverTrigger asChild>

<Button
variant="outline"
className={cn(
"w-full justify-start text-left font-normal",
!dob && "text-muted-foreground"
)}
>

<CalendarIcon className="mr-2 h-4 w-4"/>

{dob ? format(dob,"PPP") : "Pick a date"}

</Button>

</PopoverTrigger>

<PopoverContent className="w-auto p-0">

<Calendar
mode="single"
selected={dob}
onSelect={setDob}
/>

</PopoverContent>

</Popover>

</div>

{/* EMPLOYEE ID */}

<div>

<Label>Employee ID</Label>

<Input
value={employeeId}
onChange={(e)=>setEmployeeId(e.target.value)}
/>

</div>

{/* GENDER */}

<div>

<Label>Gender</Label>

<Select value={gender} onValueChange={setGender}>

<SelectTrigger>

<SelectValue placeholder="Select gender"/>

</SelectTrigger>

<SelectContent>

<SelectItem value="male">Male</SelectItem>
<SelectItem value="female">Female</SelectItem>
<SelectItem value="other">Other</SelectItem>

</SelectContent>

</Select>

</div>

{/* MARITAL */}

<div>

<Label>Marital Status</Label>

<Select value={maritalStatus} onValueChange={setMaritalStatus}>

<SelectTrigger>

<SelectValue placeholder="Select status"/>

</SelectTrigger>

<SelectContent>

<SelectItem value="single">Single</SelectItem>
<SelectItem value="married">Married</SelectItem>

</SelectContent>

</Select>

</div>

{/* EMAIL */}

<div className="col-span-2">

<Label>Email</Label>

<Input
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

</div>

</div>

{/* IMAGE */}

<div className="flex flex-col gap-6">

<div className="min-w-42 h-52 border-2 border-dashed flex items-center justify-center">

{imgPreview ?

<img src={imgPreview} className="w-full h-full object-cover"/>

:

<FaUserTie className="text-5xl text-muted"/>

}

</div>

<Input
type="file"
accept="image/*"
onChange={handleImageChange}
/>

</div>

</div>

{/* JOB INFO */}

<div className="grid grid-cols-2 gap-4">

<div>

<Label>Designation</Label>

<Input
value={designation}
onChange={(e)=>setDesignation(e.target.value)}
/>

</div>

<div>

<Label>Department</Label>

<Select value={department} onValueChange={(value)=>setDepartment(value)}>

<SelectTrigger className="w-full">

<SelectValue placeholder="Select department"/>

</SelectTrigger>

                <SelectContent>
                  {departments.map((dep)=>(
                    <SelectItem key={dep._id} value={dep._id}>
                     {dep.name}
                    </SelectItem>
                  ))}
                </SelectContent>

</Select>

</div>

<div>

<Label>Salary</Label>

<Input
type="number"
value={salary}
onChange={(e)=>setSalary(e.target.value)}
/>

</div>

<div>

<Label>Role</Label>

<Select value={role} onValueChange={setRole}>

<SelectTrigger className="w-full">

<SelectValue placeholder="Select role"/>

</SelectTrigger>

<SelectContent>

<SelectItem value="admin">Admin</SelectItem>
<SelectItem value="manager">Manager</SelectItem>
<SelectItem value="employee">Employee</SelectItem>

</SelectContent>

</Select>

</div>

</div>

{/* UPDATE BUTTON */}

<div className="flex justify-end pt-4">

<Button onClick={handleUpdate}>

Update Employee

</Button>

</div>

</CardContent>

</Card>

</div>

)

}