import Jwt  from "jsonwebtoken";
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
    //JWT generation
    const token = Jwt.sign(
        {userId: user._id, role: user.role},
        process.env.JWT_SECRET!,
        {expiresIn: "7d"}
    );
    
    const res = NextResponse.json({
        message: "Login Successful",
        user: {name:user.name, role:user.role}
    });

    //set token in HTTP-only cookie
    res.cookies.set({
        name: "authToken",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 //7 days
    });

    return res;

} catch(error){
    return NextResponse.json({message: "Server Error"}, {status:500});
}    
}