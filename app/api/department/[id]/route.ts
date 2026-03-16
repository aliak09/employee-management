import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Department from "@/models/Department";
import Employee from "@/models/Employee";
import { authenticate } from "@/lib/auth";

export async function GET(
    req:NextRequest, 
    context :{ params: Promise<{ id: string }> }) {

        await connectDB();

        const user = authenticate(req);

        if(!user){
            return NextResponse.json({message:"Unauthorized"}, {status:401});
        }
        
        const { id } = await context.params;

        const department = await Department.findById(id);

        if(!department){
            return NextResponse.json({message:"Department not found"}, {status:404});
        }
        
        return NextResponse.json({department});
}

export async function PUT(
    req:NextRequest, 
    context :{ params: Promise<{ id: string }> }
) {
    
        await connectDB();

        const user = authenticate(req);

        if(!user){
            return NextResponse.json({message:"Unauthorized"}, {status: 401});
        }

        if(user.role.toLowerCase() !== "admin"){
            return NextResponse.json({message:"Forbidden:Admins Only"}, {status:403});
        }
        
        const {id} = await context.params;

        
        try{
                
                const body = await req.json();

                if(body.name) body.name = body.name.trim();

                if(body.description) body.description = body.description.trim();

                if (Object.keys(body).length === 0) {
                return NextResponse.json(
                    { message: "No valid fields to update" },
                    { status: 400 }
                );
                }

                if (body.name) {
                const existing = await Department.findOne({
                    name: body.name,
                    _id: { $ne: id }
                });

                if (existing) {
                    return NextResponse.json(
                    { message: "Department name already exists" },
                    { status: 400 }
                    );
                }
                }

                const updatedDepartment = await Department.findByIdAndUpdate(
                id,
                body,
                { returnDocument: "after" }
                );
                
                if(!updatedDepartment){
                    return NextResponse.json({message:"Department not found"}, {status: 404});
                }
                    
                return NextResponse.json({message:"Department Updated", updatedDepartment});
            
        }catch(error:any){
                
                console.error(error);
                
                return NextResponse.json({message: error.message}, {status:500});
            }
}

export async function DELETE(
    req:NextRequest, 
    context :{ params: Promise<{ id: string }> }
) {
    
        await connectDB();

        const user = authenticate(req);

        if(!user){
            return NextResponse.json({message:"Unauthorized"}, {status: 401});
        }

        if(user.role.toLowerCase() !== "admin"){
            return NextResponse.json({message:"Forbidden:Admins Only"}, {status:403});
        }
        
        const {id} = await context.params;

        const employeeExists = await Employee.findOne({ department: id });

        if (employeeExists) {
        return NextResponse.json(
            { message: "Cannot delete department assigned to employees" },
            { status: 400 }
        );
        }

        const department = await Department.findByIdAndDelete(id);

        if(!department){
            return NextResponse.json({message:"Department not found"}, {status: 404});
        }

        return NextResponse.json({message:"Department Deleted Successfully"});
}