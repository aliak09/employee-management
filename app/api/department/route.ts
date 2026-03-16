import { NextResponse, NextRequest } from "next/server";
import Department from "@/models/Department";
import { connectDB } from "@/lib/db";
import { authenticate } from "@/lib/auth";

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
    
    const departments = await Department.find({
        name: {$regex: search, $options: "i"}
    })
    .sort({createdAt:-1})
    .skip(skip)
    .limit(limit);
    
    const total = await Department.countDocuments();

    return NextResponse.json({
        departments,
        pagination:{
            total,
            page,
            totalPages:Math.ceil(total/limit)
        }
    });
}

export async function POST(req:NextRequest) {

try{
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
    //department creation
    const body = await req.json();
    const {
        name,
        description    
    } = body;

    //check for existing department
    const existingDepartment = await Department.findOne({ name });

    if (existingDepartment) {
        return NextResponse.json(
            { message: "Department already exists" },
            { status: 400 }
        );
    }
    const departmentDoc = await Department.create({
        name,
        description
    });

    const department = departmentDoc.toObject(); 

    return NextResponse.json({
        message: "Department created",
        department
    });
}catch(error){
 
    return NextResponse.json(
        { message: "Server Error" },
        { status: 500 }
        );
    }
}