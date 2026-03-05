import { NextRequest, NextResponse } from "next/server";
import Jwt  from "jsonwebtoken";

// check if the user is logged in
export function authenticate(req:NextRequest){
    const token = req.cookies.get("authToken")?.value;
    if(!token){
        return null;
    }
    try{
        const decode = Jwt.verify(token, process.env.JWT_SECRET!);
        return decode;
    } catch(err){
        return null;
    }
}