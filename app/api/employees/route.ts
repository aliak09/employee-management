import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Employee from "@/models/Employee";
import { authenticate } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(req:NextRequest) {
    await connectDB();

    const user = authenticate(req);
    if(!user){
        return NextResponse.json(
            {message:"Unauthorized"},
            {status: 401}
        );
    }
    
    const employees = await Employee.find().select("-password");
    return NextResponse.json({
        employees
    });
}

export async function POST(req:NextRequest) {
    await connectDB();

    const user= authenticate(req);

    console.log("Decoded user:", user);

    if(!user){
        return NextResponse.json(
            {message: "Unauthorized"},
            {status: 401}
        );
    }

    //role check
    if(user.role.toLowerCase() !=="admin"){
        return NextResponse.json(
            {message:"Forbidden: Admins Only"},
            {status: 403}
        );
    }
    //employee creation
    const {name, email, password, role} = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const employeeDoc = await Employee.create({
        name,
        email, 
        password:hashedPassword,
        role
    });

    const employee = employeeDoc.toObject();
    delete employee.password; 

    return NextResponse.json({
        message: "Employee created",
        employee
    });
}