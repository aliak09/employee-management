"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FaBuildingColumns, FaHourglassHalf, FaUsers } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { FaCheckCircle, FaFileAlt, FaTimesCircle } from "react-icons/fa";


const overviewItems = [
    {
        name: "Total Empoloyees",
        total: 13,
        icon: <FaUsers/>
    },
    {
        name: "Total Departments",
        total: 13,
        icon: <FaBuildingColumns/>
    },
    {
        name: "Monthly Pay",
        total: 13,
        icon: <LiaMoneyBillSolid/>
    }

];

const leaveDetails = [
    {
        name: "Leave Applied",
        total: 13,
        icon: <FaFileAlt/>,
        bgColor:"bg-teal-600"
    },
    {
        name: "Leave Approved",
        total: 10,
        icon: <FaCheckCircle/>,
        bgColor:"bg-green-600"
    },
    {
        name: "Leave Pending",
        total: 3,
        icon: <FaHourglassHalf/>,
        bgColor:"bg-yellow-600"
    },
    {
        name: "Leave Rejected",
        total: 2,
        icon: <FaTimesCircle/>,
        bgColor:"bg-red-600"
    }

];

export default function AdminDashboard() {

    const [employees, setEmployees]=useState([]);


    const createEmployee = async()=>{
        const res = await fetch("/api/employees",{
            method:"POST",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({
                name: "Test Employee 3",
                email: "test3@company.com",
                password: "123456",
                role: "employee"
            })
        });
    if (!res.ok) {
        const errText = await res.text(); // get the error text
        console.error("Error creating employee:", errText);
        alert(errText);
        return;
        }
    const data = await res.json();
    console.log(data);
    alert(JSON.stringify(data));
    };
  return (
<>
    <div className="space-y-6">

        <div className="font-bold mb-4">Dashboard Overview</div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

            {overviewItems.map((item, index)=>(

                <Card key={index} className="flex items-center flex-row justify-start min-h-18 w-full p-0 rounded-lg">

                    <div className={`flex items-center justify-center w-24 h-full text-white bg-black text-6xl rounded-l-lg`}>
                    
                        {item.icon}
                    
                    </div> 
                    
                    <div className="flex flex-col font-semibold">
                    
                        <div className="mb-2">
                    
                            {item.name}
                    
                        </div>
                    
                        <div>
                    
                            {item.total}
                    
                        </div>
                    
                    </div>
                
                </Card>
            ))}

        </div>

    </div>

    <div className="space-y-6 mt-10">
    
        <div className="font-bold mb-4">Leave Details</div>
    
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
    
            {leaveDetails.map((item, index)=>(

                <Card key={index} className="flex items-center flex-row justify-start min-h-18 w-full p-0 rounded-lg">
                
                    <div className={`flex items-center justify-center w-24 h-full text-white ${item.bgColor} text-6xl rounded-l-lg`}>
                
                        {item.icon}
                
                    </div> 
                
                    <div className="flex flex-col font-semibold">
                
                        <div className="mb-2">
                
                            {item.name}
                
                        </div>
                
                        <div>
                
                            {item.total}
                
                        </div>
                
                    </div>
                
                </Card>
            
            ))}
            
        </div>
        
        {/* <Button onClick={createEmployee}>
            Create Employee
        </Button> */}
    
    </div>
</>

)
}
