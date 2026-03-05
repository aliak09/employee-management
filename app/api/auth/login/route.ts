import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import Employee from "@/models/Employee";

export async function POST(req:NextRequest) {
try{
    await connectDB();
    const {email, password} = await req.json();
    // find user
    const user = await Employee.findOne({email});
    if(!user){
        return NextResponse.json(
            {message: "Invalid Email or Password"},
            {status:401}
        );
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return NextResponse.json(
            {message: "Invalid Email or Password"},
            {status:401}
        );
    }

    return NextResponse.json({
        message: "Login Successful",
        user:{
            id: user._id,
            name: user.name,
            role: user.role
        }
    });

} catch(error){
    return NextResponse.json({message: "Server Error"}, {status:500});
}    
}