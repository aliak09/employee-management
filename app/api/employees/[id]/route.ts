import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import Employee from "@/models/Employee";
import { authenticate } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET(
    req:NextRequest, 
    context :{ params: Promise<{ id: string }> }) {

        await connectDB();

        const user = authenticate(req);

        if(!user){
            return NextResponse.json({message:"Unauthorized"}, {status:401});
        }
        
        const { id } = await context.params;

        const employee = await Employee.findById(id).select("-password");

        if(!employee){
            return NextResponse.json({message:"Employee not found"}, {status:404});
        }
        
        return NextResponse.json({employee});
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

        if(user.role !== "admin"){
            return NextResponse.json({message:"Forbidden:Admins Only"}, {status:403});
        }
        
        const {id} = await context.params;

        const body =await req.json();
        
        try{
                //check to update only specific fields
                const allowedFields =[
                    "name", 
                    "email", 
                    "password", 
                    "profileImage", 
                    "employeeId",
                    "dob",
                    "gender",
                    "maritalStatus",
                    "designation",
                    "department",
                    "salary"
                ];
                const updates:any= {};
                
                allowedFields.forEach((field)=>{
                    if(body[field] !== undefined){
                        updates[field] = body[field];
                    }
                });

                if(updates.password){
                    updates.password = await bcrypt.hash(updates.password, 10);
                }
                
                if(updates.name) updates.name = updates.name.trim();

                if(updates.email) updates.email = updates.email.trim().toLowerCase();
                
                const updatedEmployee = await Employee.findByIdAndUpdate(
                    id,
                    updates,
                    {returnDocument: "after"}
                ).select("-password");
                
                if(!updatedEmployee){
                    return NextResponse.json({message:"Employee not found"}, {status: 404});
                }
                    
            return NextResponse.json({message:"Employee Updated", updatedEmployee});
            
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

        if(user.role !== "admin"){
            return NextResponse.json({message:"Forbidden:Admins Only"}, {status:403});
        }
        
        const {id} = await context.params;

        const employee = await Employee.findByIdAndDelete(id);

        if(!employee){
            return NextResponse.json({message:"Employee not found"}, {status: 404});
        }

        return NextResponse.json({message:"Employee Deleted Successfully"});
}