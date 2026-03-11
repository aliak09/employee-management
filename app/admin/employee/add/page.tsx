"use client"
import { useEffect, useState } from "react"
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
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
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

  const handleSubmit = async()=>{
    try{
         const res = await api.post("/employees", {
         name: `${firstName} ${lastName}`,
         email,
         password,
         role,
         gender,
         maritalStatus,
         department,
         salary,
         designation,
         dob
        });

    alert("Employee created successfully");


    }catch(error:any){
        console.log(error.response?.data?.message);
        alert(error.response?.data?.message);
    }
}
//  const handleSubmit = async () => {
//   try {
//     // Prepare FormData to handle file upload
//     const form = new FormData();
//     form.append("name", `${firstName} ${lastName}`);
//     form.append("email", email);
//     form.append("password", password);
//     form.append("role", role);
//     form.append("gender", gender);
//     form.append("maritalStatus", maritalStatus);
//     form.append("department", department);
//     form.append("salary", salary);
//     form.append("designation", designation);

//     if (dob) {
//       form.append("dob", dob.toISOString()); // Convert Date to string
//     }

//     if (employeeId) {
//       form.append("employeeId", employeeId);
//     }

//     if (imgPreview) {
//       const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
//       if (fileInput?.files?.[0]) {
//         form.append("profileImage", fileInput.files[0]);
//       }
//     }

//     // Send request using axios from lib/axios.ts
//     const res = await api.post("/employees", form, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     alert("Employee created successfully!");
//     console.log(res.data);

//     // Optional: reset form after submit
//     setFirstName("");
//     setLastName("");
//     setEmail("");
//     setPassword("");
//     setRole("");
//     setGender("");
//     setMaritalStatus("");
//     setDepartment("");
//     setSalary("");
//     setDesignation("");
//     setDob(undefined);
//     setEmployeeId("");
//     setImagePreview(null);

//   } catch (error: any) {
//     console.error(error);
//     alert(error.response?.data?.message || "Something went wrong!");
//   }
// };
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
                </div>

                <div>
                    <Label>Last Name</Label>
                    <Input 
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)} />
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
                </div>
                
                <div>
                    <Label>Employee ID</Label>
                    <Input 
                    placeholder="EMP001"
                    value={employeeId}
                    onChange={(e)=>setEmployeeId(e.target.value)} 
                    />
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
                </div>
                
                <div className="col-span-2">
                <Label>Email</Label>
                <Input 
                type="email" 
                placeholder="john@email.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
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
            </div>
          
            <div>
                <Label>Salary</Label>
                <Input 
                type="number" 
                placeholder="$5000" 
                value={salary}
                onChange={(e)=>setSalary(e.target.value)}/>
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
           </div>
          
        </div>

        <div>
            <Label>Password</Label>
            <Input 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
        </div>

        
        {/* Submit */}
        <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit}>Add Employee</Button>
        </div>

        </CardContent>
      </Card>
    </div>
  )
}