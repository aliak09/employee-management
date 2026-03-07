"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react";


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
    <div className="flex justify-center items-center flex-col">
        <h1 className="font-bold text-2xl mb-10">Admin Dashboard</h1>
        <Button onClick={createEmployee}>
            Create Employee
        </Button>
    </div>
  )
}
