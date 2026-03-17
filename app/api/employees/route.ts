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
    
    const {searchParams} = new URL(req.url);
    
    const page = parseInt(searchParams.get("page") || "1");
    
    const limit = parseInt(searchParams.get("limit") || "5");
    
    const skip = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    
    const employees = await Employee.find({
        name: {$regex: search, $options: "i"}
    })
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit)
    .select("-password")
    .populate("department","name");

    
    const total = await Employee.countDocuments();

    return NextResponse.json({
        employees,
        pagination:{
            total,
            page,
            totalPages:Math.ceil(total/limit)
        }
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
    const body = await req.json();
    const {
        name,
        email,
        password,
        role,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        profileImage    
    } = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const employeeDoc = await Employee.create({
        name,
        email,
        password: hashedPassword,
        role,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        profileImage
    });

    const employee = employeeDoc.toObject();
    delete employee.password; 

    return NextResponse.json({
        message: "Employee created",
        employee
    });
}