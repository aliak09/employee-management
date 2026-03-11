"use client"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import {Popover,PopoverContent,PopoverTrigger} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { FaUserTie} from "react-icons/fa6"
import api from "@/lib/axios"

export default function AddEmployeePage() {

  const [dob, setDob] = useState<Date | undefined>();
  const [imgPreview, setImagePreview]=useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate the form whenever a value changes
  useEffect(() => {
    const newErrors: { [key: string]: string } = {}

    if (!firstName.trim()) newErrors.firstName = "First Name is required"
    if (!lastName.trim()) newErrors.lastName = "Last Name is required"
    if (!employeeId.trim()) newErrors.employeeId = "Employee ID is required"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format"
    if (!password) newErrors.password = "Password is required"
    if (!dob) newErrors.dob = "Date of Birth is required"
    if (!gender) newErrors.gender = "Gender is required"
    if (!maritalStatus) newErrors.maritalStatus = "Marital Status is required"
    if (!designation.trim()) newErrors.designation = "Designation is required"
    if (!department) newErrors.department = "Department is required"
    if (!salary || isNaN(Number(salary))) newErrors.salary = "Salary is required"
    if (!role) newErrors.role = "Role is required"

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }, [
    firstName,
    lastName,
    employeeId,
    email,
    password,
    dob,
    gender,
    maritalStatus,
    designation,
    department,
    salary,
    role,
  ])

  const handleSubmit = async()=>{
    try{
const res = await api.post("/employees", {
    name: `${firstName} ${lastName}`,
    email,
    password,
    role,
    employeeId,
    gender,
    maritalStatus,
    department,
    salary: Number(salary), 
    designation,
    dob: dob ? dob.toISOString() : null, 
    profileImage: imgPreview || null
    });

    alert("Employee created successfully");


    }catch(error:any){
        console.log(error.response?.data?.message);
        alert(error.response?.data?.message);
    }
}

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  }
};



  return (
    <div className="max-w-4xl mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Employee</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="flex justify-between items-start gap-4">

            <div className="grid grid-cols-2 gap-6 w-full">
            
                <div>
                    <Label>First Name</Label>
                    <Input 
                    placeholder="John"
                    value={firstName}
                    onChange={(e)=>setFirstName(e.target.value)}
                    />
                    <p className="text-red-500 text-sm min-h-[1.25rem]">
                    {errors.firstName ? errors.firstName : <span className="invisible">placeholder</span>}
                    </p>
                </div>

                <div>
                    <Label>Last Name</Label>
                    <Input 
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>

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
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dob ? format(dob, "PPP") : "Pick a date"}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={dob}
                    onSelect={setDob}
                    initialFocus
                    />
                </PopoverContent>
                </Popover>
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
                </div>
                
                <div>
                    <Label>Employee ID</Label>
                    <Input 
                    placeholder="EMP001"
                    value={employeeId}
                    onChange={(e)=>setEmployeeId(e.target.value)}
                    />
                    {errors.employeeId && <p className="text-red-500 text-sm">{errors.employeeId}</p>}
                </div>

                <div>
                <Label>Gender</Label>
                <Select onValueChange={setGender}>
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
                
                <div>
                    <Label>Marital Status</Label>

                    <Select onValueChange={setMaritalStatus}>
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>
                
                <div className="col-span-2">
                <Label>Email</Label>
                <Input 
                type="email" 
                placeholder="john@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
            </div>
            
            <div className="flex flex-col gap-7">
                <div className="min-w-42 h-52 border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">
                    {imgPreview ? (
                        <img src={imgPreview} alt="Profile Preview" className="w-full h-full object-cover"/>
                    ):(
                        
                        <FaUserTie className="w-full h-full object-cover text-muted"/>
                    )
                    }
                </div>
                <div>

                    <Input 
                    type="file" 
                    accept="image/*" 
                    className="w-full"
                    onChange={handleImageChange} 
                    />
                
                </div>
            </div>
        </div> 
          
          
        <div className="grid grid-cols-2 gap-4">
           
            <div>
              <Label>Designation</Label>
              <Input 
              placeholder="Software Engineer" 
              value={designation}
              onChange={(e)=>setDesignation(e.target.value)}
              />
              {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
            </div>

            <div>
              <Label>Department</Label>

              <Select onValueChange={setDepartment}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
            </div>
          
            <div>
                <Label>Salary</Label>
                <Input 
                type="number" 
                placeholder="$5000" 
                value={salary}
                onChange={(e)=>setSalary(e.target.value)}
                />
                {errors.salary && <p className="text-red-500 text-sm">{errors.salary}</p>}
            </div>
          
            <div>
            <Label>Role</Label>

            <Select onValueChange={setRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
           </div>
          
        </div>

        <div>
            <Label>Password</Label>
            <Input 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        
        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button 
            onClick={handleSubmit}
            disabled={!isFormValid}
            >
                Add Employee
            </Button>
        </div>

        </CardContent>
      </Card>
    </div>
  )
}